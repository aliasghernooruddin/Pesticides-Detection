import pandas as pd 

model = pd.read_excel('disease.xlsx')
# model.set_index(model['Unnamed: 0'],drop=True,inplace=True)
# del model.index.name
# del model['Unnamed: 0']


def getExpertResult(symptoms):
    df = model.copy()
    if (len(symptoms) != 0 and len(symptoms) == 1):
        df = df.loc[df[symptoms[0]] == 1]
        return df.index.tolist()   
    elif len(symptoms) != 0:
        data = {}
        for index,values in enumerate(symptoms):
            data[index] = df.loc[df[values] == 1]

        combine = ''
        for index in data:
            combine += 'set(data[' + str(index) + '].index.tolist()) & '

        result = eval(combine[:-3])
        if result:
            return list(result)
        else:
            return data[0].index.tolist()
    else:
        return None   
          