import { Component, OnInit, Inject,Output,EventEmitter} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceGQl } from '../../../service/graphql';
import { Canteen } from 'src/app/model/canteen';

interface DialogData {
  canteen: Canteen;
}

@Component({
  selector: 'app-booking-list-dialog',
  templateUrl: './booking-list-dialog.component.html',
  styleUrls: ['./booking-list-dialog.component.scss']
})
export class BookingListDialogComponent implements OnInit {
  displayedColumns: string[] = ['日期', '早餐', '午餐', '晚餐'];

  private source: DialogData;
  loading:boolean = false;
  done:boolean = false;
  returnMsg: string = "";

  formatCheckErrorResult = {};

  @Output()
  onSubmit:EventEmitter<number> = new EventEmitter<number>();
  constructor( private apollo: Apollo,public dialogRef: MatDialogRef<BookingListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.source = data;
    }

  ngOnInit() {
  }

}


