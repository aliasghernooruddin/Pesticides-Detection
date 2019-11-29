from flask import Flask
from flask import jsonify, Response, request
import firebase_admin
from firebase_admin import credentials, firestore
from flask_cors import CORS, cross_origin
import json
import os
import shutil
import uuid
from datetime import datetime
import random
from SVM import getExpertResult
# from CNN import test_single_image

cred = credentials.Certificate("./firebaseCredentials.json")
FIRESTORE = firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)
CORS(app)


@app.route('/register', methods=['POST'])
def register():
    data = json.loads(request.data)
    user = data['usertype'].lower()
    del data['cpassword']
    del data['usertype']
    if user == 'user':
        expert = db.collection(u'expert').stream()
        experts = []
        for doc in expert:
            experts.append(doc.id)
        expert = random.choice(experts)
        data['expert'] = expert
    else:
        del data['longitude']
        del data['latitude']
    data = db.collection(user).document(data['username'].lower()).set(data)
    message = {'register': True}
    return jsonify(message)


@app.route('/login', methods=['POST'])
def login():
    data = json.loads(request.data)
    doc_ref = db.collection(
        data['usertype'].lower()).document(data['uname']).get()
    doc = doc_ref.to_dict()

    if doc:
        if doc['password'] == data['password']:
            data = {'allow': True, 'username': doc['username'], 'userType': data['usertype'].lower()}
            return jsonify(data)

    message = {'allow': False}
    return jsonify(message)


@app.route('/userDetails', methods=['POST'])
def getUserDetails():
    data = json.loads(request.data)
    doc_ref = db.collection(data['type']).document(data['username']).get()
    user_details = doc_ref.to_dict()
    report = []
    expert = None
    if data['type'] == 'user':
        # url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + data['latitude'] +','+data['longitude'] + '&key=AIzaSyBAQqTP9GPC3fZ0g6kLol0c3FtUMoafiHE'
        document = db.collection(u'expert').document(user_details['expert']).get()
        expert = document.to_dict()
        query_ref = db.collection(u'uploads').where(u'username', u'==', data['username']).stream()
        for doc in query_ref:
            report.append(doc.to_dict())
    elif data['type'] == 'expert':
        query_ref = db.collection(u'uploads').where(u'expertAssigned', u'==', user_details['username']).stream()
        for doc in query_ref:
            data1 = doc.to_dict()
            doc_ref = db.collection(u'user').document(data1['username']).get()
            data2 = doc_ref.to_dict()
            data1['fullname'] = data2['fullname']
            data1['id'] = doc.id
            report.append(data1)
    elif data['type'] == 'researcher':
        query_ref = db.collection(u'uploads').stream()
        for doc in query_ref:
            data1 = doc.to_dict()
            doc_ref = db.collection(u'user').document(data1['username']).get()
            data2 = doc_ref.to_dict()
            data1['fullname'] = data2['fullname']
            report.append(data1)

    return jsonify({'data': user_details,'reports':report,'expert':expert})


@app.route('/upload', methods=['POST'])
def postUploadFile():
    if request.method == 'POST':
        today = str(datetime.now())[:-7]
        data = json.loads(request.data)
        filename = data['file'][12:]
        shutil.copy('images/'+filename, 'assets')
        uniq_id = uuid.uuid4().hex[8:18]
        ext = os.path.splitext(filename)[1]
        jarvis = getExpertResult(data['symptoms'])
        # result = test_single_image('assets/'+filename)
        import pdb; pdb.set_trace()
        os.rename('assets/' + filename, '../Frontend - Ionic/src/assets/images/' + uniq_id + ext)
        data = {'comments': data['comments'], 'filename': uniq_id+ext, 'symptoms': data['symptoms'],
                'username': data['username'], 'jarvis': jarvis, 'expert': None, 'expertAssigned': data['expert'], 'date': today}
        data = db.collection(u'uploads').add(data)

        return jsonify({'result': 'success'})

    return jsonify({'result': 'failed'})


@app.route('/updateExpertOpinion', methods=['POST'])
def updateExpertOpinion():
    if request.method == 'POST':
        data = json.loads(request.data)
        try:
            doc_ref = db.collection(u'uploads').document(data['id']).update({'expert':data['opinion']})
            return jsonify({'success': True})
        except:
            return jsonify({'success': False})


