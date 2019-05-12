import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Apollo } from 'apollo-angular';
import config  from '../../../config/config';
import { Canteen } from 'src/app/model/canteen';
import { ServiceGQl } from '../../../service/graphql';

export interface DialogData {
  name: string;
  canteen: Canteen;
}

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})
export class QrcodeDialogComponent implements OnInit {

  source: DialogData ; 
  baseUrl:string = config.baseurl; 
  loading:boolean = false; 
  returnMsg:string = "";

  constructor(
    public dialogRef: MatDialogRef<QrcodeDialogComponent>,private apollo: Apollo, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.source = data ;     
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  generate():void{
    this.loading = true  ;
    this.apollo.mutate({
      mutation: ServiceGQl.genQrcodeGQL,
      variables: {
        id:this.source.canteen.id,
      },
    }).subscribe((data) => {
      this.loading = false;
      this.source.canteen.qrcode = data['data']['createQrcode'];
    },(error) => {
      this.loading = false;
      this.returnMsg = error;
    });
  }
}
