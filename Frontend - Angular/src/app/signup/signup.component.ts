import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../password-validation';
import { RepositoryService } from '../Repository'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private regForm: FormGroup;
  submitted = false;
  show = false;
  users: any = ['User', 'Expert', 'Researcher']
  domains: any = ['Common Bunt', 'Common Root Rot', 'Fusarium Head Blight', 'Leaf Rust', 'Powdery Mildew']

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private repo: RepositoryService, private router: Router) {
    this.regForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      usertype: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      domains: [''],
      cpassword: [''],
      longitude: [''],
      latitude: [''],
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.regForm.controls; }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.regForm.value['longitude'] = position.coords.longitude;
        this.regForm.value['latitude'] = position.coords.latitude;
        this.registerUser()
      });
    } else {
      this.registerUser()
      alert("Geolocation is not supported by this browser.");
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  changeAction(e) {
    if (e != "User") {
      this.show = true
    }
    else {
      this.show = false
    }
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
    this.repo.postRequest(this.repo.registerUrl, this.regForm.value).subscribe(res => {
      if (res['register'] == true) {
        this.openSnackBar('Registered Successfully...Redirecting to Login page')
        this.router.navigateByUrl('/login');
      }
      else {
        this.openSnackBar('Failed...Try Again!')
      }
    },
      error => {
        this.openSnackBar('Server not Responded...Try Again!')
      })
  }


  ngOnInit() {
  }

}
