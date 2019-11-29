import { Component, OnInit } from '@angular/core';
import { APIService } from '../apis.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ResearcherModal } from '../researcher/researcher.modal';

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.scss'],
})

export class ResearcherComponent implements OnInit {
  username: string;
  userData = {}
  data = { type: 'researcher' }
  dataSource: [];

  constructor(private navCtrl:NavController, public modalController: ModalController, private route: ActivatedRoute, private api: APIService, ) {
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

  async presentModal(data: any) {
    const modal = await this.modalController.create({
      component: ResearcherModal,
      componentProps: {
        "user": data,
      }
    });
    return await modal.present();
  }

  goback() {
    this.navCtrl.pop();
 }

  ngOnInit() {
  }
}
