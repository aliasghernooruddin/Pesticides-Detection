import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    templateUrl: 'user-modal.html',
    selector: 'user-modal'
})

export class UserMoreModal {

    user: any;
    expert: any;

    constructor(private modalController: ModalController,
        private navParams: NavParams) {
    }

    async closeModal() {
        const onClosedData: string = "Wrapped Up!";
        await this.modalController.dismiss(onClosedData);
    }

    ionViewWillEnter() {
        this.user = this.navParams.get('user');
        this.expert = this.navParams.get('expert');
    }
}