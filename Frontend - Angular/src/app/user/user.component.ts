import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../Repository'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  userData = {}
  private regForm: FormGroup;
  symptomlist = ['Superficial dark fungal tissue',	'Lesions', 'Black spores',	'Yellow spores',	'Blotches resembling holes',	'Superfical white',	'Pinkish greyish fungal',	'Shape change',	'Fungi',	'Scab infection',	'Dark fungal fruiting bodies',	'Flecks',	'Stunted growth',	'Chlorosis/ necrosis']
  show = false;
  username = ''
  expert = null
  displayedColumns: string[] = ['date', 'comments', 'jarvis', 'expert', 'actions'];
  dataSource:[];
  data = { type: 'user' }

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private repo: RepositoryService) {
    this.username = this.route.snapshot.paramMap.get('name')
    this.data['username'] = this.username
    this.getData()

    this.regForm = this.formBuilder.group({
      username: [this.username],
      symptoms: [''],
      comments: [''],
      expert: [''],
      file: [null, Validators.required]
    })
  } 

  openDialog(id,expert): void {
    this.dialog.open(DialogOverview, {
      width: '500px',
      data: [id,expert]
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

  getData(){
    this.repo.postRequest(this.repo.getUserDetailsUrl, this.data).subscribe(res => {
      if (res['data']) {
        this.userData = res['data']
        this.dataSource = res['reports']
        this.expert = res['expert']
        this.show = true
      }
    })
  }

  onSubmit() {
    if (this.regForm.invalid) {
      this.openSnackBar("Please fill the form")
      return;
    }
    this.regForm.value['expert'] = this.expert['username']
    let formData = this.regForm.value
    this.repo.postRequest(this.repo.uploadDataUrl,formData).subscribe((data: any) => {
      if(data['result'] == 'success'){
        this.getData()
        this.openSnackBar("Data Uploaded to Server...Please wait for experts opinions")
      }
      else{
        this.openSnackBar("Failed...Please try again later")
      }
    }); 
  }


  goHome() {
    this.router.navigateByUrl('home')
  }

  ngOnInit(){
  }
}


@Component({
  selector: 'dialog-overflow',
  templateUrl: 'dialog-overflow.html',
  styles: ['p{font-size:15px','img{width:450px; height:auto}']
})
export class DialogOverview {

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}