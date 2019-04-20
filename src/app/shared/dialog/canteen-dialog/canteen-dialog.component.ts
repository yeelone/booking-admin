import { Component, OnInit, Inject,Output,EventEmitter} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceGQl } from '../../../service/graphql';
import { Canteen } from 'src/app/model/canteen';

interface DialogData {
  canteen: Canteen;
  groupId: number; 
}

@Component({
  selector: 'app-canteen-dialog',
  templateUrl: './canteen-dialog.component.html',
  styleUrls: ['./canteen-dialog.component.scss']
})
export class CanteenDialogComponent implements OnInit {

  private source: DialogData;
  loading:boolean = false;
  done:boolean = false;
  returnMsg: string = "";

  formatCheckErrorResult = {};

  @Output()
  onSubmit:EventEmitter<number> = new EventEmitter<number>();
  constructor( private apollo: Apollo,public dialogRef: MatDialogRef<CanteenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.source = data;
    }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create():void{
    if ( this.checkError() ) {
      alert("表单有错误,请仔细核对");
      return ; 
    }
    this.done = false ;
    this.loading = true;
    this.apollo.mutate({
      mutation: ServiceGQl.createCanteenGQL,
      variables: {
        name:this.source.canteen.name, 
        groupID:this.source.groupId,
        breakfastTime:this.source.canteen.breakfastTime, 
        lunchTime: this.source.canteen.lunchTime, 
        dinnerTime: this.source.canteen.dinnerTime,
        bookingBreakfastDeadline:this.source.canteen.bookingBreakfastDeadline, 
        bookingLunchDeadline:this.source.canteen.bookingLunchDeadline,
        bookingDinnerDeadline:this.source.canteen.bookingDinnerDeadline, 
        cancelTime:this.source.canteen.cancelTime,
      },
    }).subscribe((data) => {
      this.loading = false;
      this.done = true ;
      this.returnMsg = "create successed";
      this.onSubmit.emit(data["data"]["createCanteens"]["id"]);
    },(error) => {
      this.loading = false;
      this.done = true ;
      this.returnMsg = error;
    });
  }
  
  update():void{
    if ( this.checkError() ) {
      alert("表单有错误,请仔细核对");
      return ; 
    }
    this.done = false ;
    this.loading = true;
    this.apollo.mutate({
      mutation: ServiceGQl.updateCanteenGQL,
      variables: {
        id: this.source.canteen.id,
        name:this.source.canteen.name, 
        groupID:this.source.groupId,
        breakfastTime:this.source.canteen.breakfastTime, 
        lunchTime: this.source.canteen.lunchTime, 
        dinnerTime: this.source.canteen.dinnerTime,
        bookingBreakfastDeadline:this.source.canteen.bookingBreakfastDeadline, 
        bookingLunchDeadline:this.source.canteen.bookingLunchDeadline,
        bookingDinnerDeadline:this.source.canteen.bookingDinnerDeadline, 
        cancelTime:this.source.canteen.cancelTime,
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

  changeTimeRange(event:string,field:string):void{
    let reg = /^(20|21|22|23|[0-1]?\d):(20|21|22|23|[0-5]\d)-(20|21|22|23|[0-1]?\d):(20|21|22|23|[0-5]\d)$/;
    let regexp = new RegExp(reg);
    let match = regexp.test(event);

    if (match) {
      this.formatCheckErrorResult[field] = false ; 
    }else{
      this.formatCheckErrorResult[field] = true ; 
    }
  }

  changeTimeFormat(event:string,field:string):void{
    let reg = /^(20|21|22|23|[0-1]?\d):(20|21|22|23|[0-5]\d)$/;
    let regexp = new RegExp(reg);
    let match = regexp.test(event);

    if (match) {
      this.formatCheckErrorResult[field] = false ; 
    }else{
      this.formatCheckErrorResult[field] = true ; 
    }
  }

  checkError():boolean{
    for(let field in this.formatCheckErrorResult ) {
      if ( this.formatCheckErrorResult[field]  ) return true ; 
    }
    return false ; 
  }

}
