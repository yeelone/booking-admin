import { Component, OnInit, Inject,Output,EventEmitter} from '@angular/core';
import { User } from 'src/app/model/user';
import { Apollo } from 'apollo-angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceGQl } from '../../../service/graphql';
import config from '../../../config/config';

interface DialogData {
  user: User;
  groupId: number; 
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  source: DialogData;
  loading:boolean = false;
  done:boolean = false;
  returnMsg: string = "";

  @Output()
  onSubmit:EventEmitter<number> = new EventEmitter<number>();
  constructor( private apollo: Apollo,public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.source = data;
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpload(filepath:string):void{
    if ( filepath.length > 0 ) {
      this.source.user.picture = config.baseurl + "/" +filepath;
    }
  }

  create():void{
    this.done = false ;
    this.loading = true;
    let groupId = this.source.groupId;
    this.apollo.mutate({
      mutation: ServiceGQl.createUserGQL,
      variables: {
        username: this.source.user.username,
        email:this.source.user.email,
        picture: this.source.user.picture,
        groupId,
      },
    }).subscribe((data) => {
      this.loading = false;
      this.done = true ;
      this.returnMsg = "create successed";
      this.onSubmit.emit(data["data"]["createUser"]["id"]);
    },(error) => {
      this.loading = false;
      this.done = true ;
      this.returnMsg = error;
    });
  }
  
  update():void{
    this.done = false ;
    this.loading = true;
    this.apollo.mutate({
      mutation: ServiceGQl.updateUserGQL,
      variables: {
        id: this.source.user.id,
        username: this.source.user.username,
        email:this.source.user.email,
        picture: this.source.user.picture,
      }
    })
    .subscribe((data) => {
      this.loading = false;
      this.done = true ;
      this.returnMsg = "update successed";
    },(error) => {
      this.loading = false;
      this.done = true ;
      this.returnMsg = error;
    });
  }

  

}
