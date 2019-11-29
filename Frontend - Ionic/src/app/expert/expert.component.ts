import { Component, OnInit } from '@angular/core';
import { APIService } from '../apis.service';
import { ToastController, ModalController, NavController } from '@ionic/angular';
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

  constructor(private navCtrl:NavController, private route: ActivatedRoute, public modalController: ModalController, private toastController: ToastController, private api: APIService) {
    this.username = this.route.snapshot.paramMap.get('name')
    this.data['username'] = this.username
    this.getData()
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

  goback() {
    this.navCtrl.pop();
 }

  ngOnInit() {
  }

}




