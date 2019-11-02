import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../Repository'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {
  username: string;
  userData = {}
  data = { type: 'expert' }
  dataSource: [];
  displayedColumns: string[] = ['name', 'date', 'comments', 'jarvis', 'expert', 'actions'];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private repo: RepositoryService) {
    this.username = this.route.snapshot.paramMap.get('name')
    this.data['username'] = this.username
    this.getData()
  }

  getData() {
    this.repo.postRequest(this.repo.getUserDetailsUrl, this.data).subscribe(res => {
      if (res['data']) {
        this.userData = res['data']
        this.dataSource = res['reports']
      }
    })
  }

  openDialog(id): void {
    this.dialog.open(DialogOverviewExpert, {
      width: '500px',
      data: id
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

  goHome() {
    this.router.navigateByUrl('home')
  }

  ngOnInit() {
  }

}



@Component({
  selector: 'dialog-overflow',
  templateUrl: 'dialog-overflow.html',
  styles: ['p{font-size:15px', 'img{width:450px; height:auto}']
})
export class DialogOverviewExpert {
  expertReview: string;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExpert>,
    @Inject(MAT_DIALOG_DATA) public data, private _snackBar: MatSnackBar, private repo: RepositoryService) { 
      this.expertReview = data['expert']
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveObject(obj) {
    let data = { 'id': obj, 'opinion': this.expertReview }
    this.repo.postRequest(this.repo.updateExpertOpinionUrl, data).subscribe(res => {
      if (res['success'] == true) {
        this.openSnackBar('Review Posted On Server')
        this.dialogRef.close();
      } else {
        this.openSnackBar('Failed...Please try again later')
      }
    },
      error => {
        this.openSnackBar('Server Problem')
      })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

}