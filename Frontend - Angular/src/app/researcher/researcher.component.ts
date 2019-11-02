import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../Repository'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})
export class ResearcherComponent implements OnInit {
  username: string;
  userData = {}
  data = { type: 'researcher' }
  dataSource: [];
  displayedColumns: string[] = ['name', 'date', 'comments', 'jarvis', 'expert', 'actions'];

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private repo: RepositoryService) {
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

  openDialog(obj): void {
    this.dialog.open(DialogOverviewResearcher, {
      width: '500px',
      data: obj
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
export class DialogOverviewResearcher {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewResearcher>, @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }




}