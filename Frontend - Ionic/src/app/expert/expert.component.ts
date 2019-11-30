import { Component, OnInit } from '@angular/core';
import { APIService } from '../apis.service';
import { ToastController, ModalController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ExpertModal } from './expert.modal';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss'],
})
export class ExpertComponent implements OnInit {

  username: string;
  userData = {}
  data = { type: 'expert' }
  dataSource: [];

  constructor(private navCtrl:NavController, public platform: Platform, private route: ActivatedRoute, public modalController: ModalController, private toastController: ToastController, private api: APIService) {
    this.username = this.route.snapshot.paramMap.get('name')
    this.data['username'] = this.username
    this.getData()

    this.platform.ready().then(() => {
      this.platform.backButton.subscribe(() => {
        
        this.navCtrl.pop();
      });
    });
  }

  getData() {
    this.api.postRequest(this.api.getUserDetailsUrl, this.data).subscribe(res => {
      if (res['data']) {
        this.userData = res['data']
        this.dataSource = res['reports']
      }
    })
  }


  async presentModal(data) {
    const modal = await this.modalController.create({
      component: ExpertModal,
      componentProps: {
        "user": data,
      }
    });
    return await modal.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}




