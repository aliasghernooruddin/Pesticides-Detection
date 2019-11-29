import { Component } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { APIService } from '../apis.service';

@Component({
    templateUrl: 'expert-modal.html',
    selector: 'expert-modal'
})

export class ExpertModal {
    expertReview: string;
    data: any;

    constructor(private modalController: ModalController, private apis: APIService, private toastController: ToastController,
        private navParams: NavParams) {
    }

    async closeModal() {
        const onClosedData: string = "Wrapped Up!";
        await this.modalController.dismiss(onClosedData);
    }

    saveObj(obj) {
        let data = { 'id': obj, 'opinion': this.expertReview }
        this.apis.postRequest(this.apis.updateExpertOpinionUrl, data).subscribe(res => {
            if (res['success'] == true) {
                this.presentToast('Review Posted On Server')
                this.closeModal()
            } else {
                this.presentToast('Failed...Please try again later')
            }
        },
            error => {
                this.presentToast('Server Problem')
            })
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

    ionViewWillEnter() {
        this.data = this.navParams.get('user');
        this.expertReview = this.data['expert']
    }
}