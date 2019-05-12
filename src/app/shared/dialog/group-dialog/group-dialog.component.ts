import { Component, OnInit,EventEmitter,Output, Inject } from '@angular/core';
import { Group } from 'src/app/model/group';
import { Apollo } from 'apollo-angular';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceGQl } from 'src/app/service/graphql';
import { UserSelectorComponent } from '../../selector/user-selector/user-selector.component';
import { User } from 'src/app/model/user';
import config from 'src/app/config/config';

interface DialogData {
  group: Group;
}

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {
  source: DialogData = { group: new Group()};
  loading:boolean = false;
  done:boolean = false;
  returnMsg: string = "";
  baseUrl:string = "";

  @Output()
  onSubmit:EventEmitter<number> = new EventEmitter<number>();
  constructor( private apollo: Apollo,public dialogRef: MatDialogRef<GroupDialogComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.source = data;
      this.baseUrl = config.baseurl;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpload(filepath:string):void{
    if ( filepath.length > 0 ) {
      this.source.group.picture = filepath;
    }
  }

  create():void{
    this.done = false ;
    this.loading = true;
    this.apollo.mutate({
      mutation: ServiceGQl.createGroupGQL,
      variables: {
        name: this.source.group.name, 
        admin: this.source.group.adminInfo.id,
        picture: this.source.group.picture,
        parent: 0,
      },
    }).subscribe((data) => {
      this.loading = false;
      this.done = true ;
      this.returnMsg = "create successed";
      this.onSubmit.emit(data["data"]["createGroup"]["id"]);
    },(error) => {
      console.dir(error)
      this.loading = false;
      this.done = true ;
      this.returnMsg = error;
    });
  }

  update():void{
    this.done = false ;
    this.loading = true;
    this.apollo.mutate({
      mutation: ServiceGQl.updateGroupGQL,
      variables: {
        id: +this.source.group.id,
        name:this.source.group.name, 
        admin:+this.source.group.adminInfo.id ,
        picture: this.source.group.picture,
        parent:0,
      },
    }).subscribe((data) => {
      this.loading = false;
      this.done = true ;
      this.returnMsg = "create successed";
      this.onSubmit.emit(data["data"]["updateGroup"]["id"]);
    },(error) => {
      this.loading = false;
      this.done = true ;
      this.returnMsg = error;
    });
  }

  openUserDialog():void{
    const dialogRef = this.dialog.open(UserSelectorComponent, {
      width:'600px',
      maxHeight:'750px',
      // disableClose:true,
      data: {}
    });

    dialogRef.componentInstance.onSubmit.subscribe((users:User[]) => {
       if( users.length > 1 ) {
         alert("只能选择一个作为管理员");
         return ;
       }

       if( users.length == 0 ) {
          alert("必须选择一个作为管理员");
          return ;
        }

        this.source.group.adminInfo = users[0];
      
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ngOnInit() {
  }

}
