import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../Repository'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

export class loginVm{
  uname:string;
  password:string;
  usertype:string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  objlogin: loginVm;
  users: any = ['User', 'Expert', 'Researcher']

  constructor(private _snackBar: MatSnackBar, private repo: RepositoryService, private router: Router) {
    this.objlogin = new loginVm();
   }

  login(){
    this.repo.postRequest(this.repo.loginUrl, this.objlogin).subscribe(res => {
      if (res) {
        if(res['allow'] == true){
          this.router.navigate(['/'+res['userType'], res['username']]);
        }
        else{
          this.openSnackBar('Incorrect username or password')
        }
      }errpr => {
        this.openSnackBar('Server not Responding')
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
      horizontalPosition: 'left'
    });
  }

  ngOnInit() {
  }

}
