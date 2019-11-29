import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { APIService } from '../apis.service';
import { ToastController } from '@ionic/angular';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private logForm : FormGroup;
  
    constructor( public navCtrl: NavController, public toastController: ToastController, private formBuilder: FormBuilder, private apis: APIService ) {
      this.logForm = this.formBuilder.group({
        uname: ['', Validators.required],
        password: ['', Validators.required],
        usertype: ['', Validators.required],

      });
    }

    login(){
      this.apis.postRequest(this.apis.loginUrl, this.logForm.value).subscribe(res => {
        if (res) {
          if(res['allow'] == true){
            let navigate =  res['userType'] + '/' + res['username']
            this.navCtrl.navigateForward(navigate);
          }
          else{
            this.presentToast('Incorrect username or password')
          }
        }error => {
          this.presentToast('Server not Responding')
        }
      })
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
