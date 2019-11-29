import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../apis.service';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserMoreModal } from './user.modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @ViewChild('buttonsTemplate', { static: false }) buttonsTemplate: TemplateRef<any>;
  userData = {}
  private regForm: FormGroup;
  symptomlist = ['Superficial dark fungal tissue', 'Lesions', 'Black spores', 'Yellow spores', 'Blotches resembling holes', 'Superfical white', 'Pinkish greyish fungal', 'Shape change', 'Fungi', 'Scab infection', 'Dark fungal fruiting bodies', 'Flecks', 'Stunted growth', 'Chlorosis/ necrosis']
  show = false;
  username = ''
  expert = null
  displayedColumns: string[] = ['date', 'comments', 'jarvis', 'expert', 'actions'];
  rows = [];
  data = { type: 'user' }

  constructor(private navCtrl:NavController, public modalController: ModalController, private formBuilder: FormBuilder, private route: ActivatedRoute, private api: APIService, private toastController: ToastController) {
    this.username = this.route.snapshot.paramMap.get('name')
    this.data['username'] = this.username
    this.getData()
    this.regForm = this.formBuilder.group({
      username: [this.username],
      symptoms: [''],
      comments: [''],
      expert: [''],
      file: [null, Validators.required]
    })
  }

  getData() {
    this.api.postRequest(this.api.getUserDetailsUrl, this.data).subscribe(res => {
      if (res['data']) {
        this.userData = res['data']
        this.rows = res['reports']
        this.expert = res['expert']
        this.show = true
      }
    })
  }

  onSubmit() {
    if (this.regForm.invalid) {
      this.presentToast("Please fill the form")
      return;
    }
    this.regForm.value['expert'] = this.expert['username']
    let formData = this.regForm.value
    this.api.postRequest(this.api.uploadDataUrl, formData).subscribe((data: any) => {
      if (data['result'] == 'success') {
        this.getData()
        this.presentToast("Data Uploaded to Server...Please wait for experts opinions")
      }
      else {
        this.presentToast("Failed...Please try again later")
      }
    });
  }

  goback() {
    this.navCtrl.pop();
 }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentModal(user: any) {
    const modal = await this.modalController.create({
      component: UserMoreModal,
      componentProps: {
        "user": user,
        "expert": this.expert
      }
    });
    return await modal.present();
  }


  ngOnInit() {

  }

}
