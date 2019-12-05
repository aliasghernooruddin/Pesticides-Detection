import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../apis.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  private regForm: FormGroup;
  submitted = false;
  domains: any = ['Common Bunt', 'Common Root Rot', 'Fusarium Head Blight', 'Leaf Rust', 'Powdery Mildew']

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public toastController: ToastController, private api: APIService) {
    this.regForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      usertype: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: [''],
      domains: [''],
      longitude: [''],
      latitude: [''],
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.regForm.controls; }

  findMe() {
    this.registerUser()
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
    this.submitted = true
    if (this.regForm.invalid) {
      return;
    }
    if (this.regForm.controls['usertype'].value == 'User') {
      this.findMe()
    }
    else {
      this.registerUser()
    }
  }

  registerUser() {
    this.api.postRequest(this.api.registerUrl, this.regForm.value).subscribe(res => {
      if (res['register'] == true) {
        this.presentToast('Registered Successfully...Redirecting to Login page')
        this.navCtrl.navigateForward('login');
      }
      else {
        this.presentToast('Failed...Try Again!')
      }
    },
      error => {
        this.presentToast('Server not Responded...Try Again!')
      })
  }

  ngOnInit() { }

}















//   openSnackBar(message: string) {
//     this._snackBar.open(message, 'close', {
//       duration: 1000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top'
//     });
//   }




