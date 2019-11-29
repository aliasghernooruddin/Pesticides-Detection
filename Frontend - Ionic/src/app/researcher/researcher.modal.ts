import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    templateUrl: 'researcher-modal.html',
    selector: 'researcher-modal'
})

export class ResearcherModal {

    data: any;

    constructor(private modalController: ModalController,
        private navParams: NavParams) {
    }

    async closeModal() {
        const onClosedData: string = "Wrapped Up!";
        await this.modalController.dismiss(onClosedData);
    }

    ionViewWillEnter() {
        this.data = this.navParams.get('user');
    }
}