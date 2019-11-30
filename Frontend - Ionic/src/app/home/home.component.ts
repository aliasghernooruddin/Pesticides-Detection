import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  loginPage() {
    this.navCtrl.navigateForward('login');
  }

  registerPage(){
    this.navCtrl.navigateForward('register');
  }

  ngOnInit() { }

}
