import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { Apollo } from 'apollo-angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceGQl } from '../../../service/graphql';
import config from '../../../config/config';
import { merge, Subscription, of as observableOf } from 'rxjs';
import {MatPaginator, MatTableDataSource} from '@angular/material';

interface DialogData {
  user: User;
}

interface CountData {
  breakfast: number;
  lunch: number ;
  dinner: number ;
}

interface RecordData {
  operator: number;
  owner: number ;
  action: string ; // sell or recycling 
  descritpion: string; 
  createdAt: string ;
}


@Component({
  selector: 'app-ticket-seller-dialog',
  templateUrl: './ticket-seller-dialog.component.html',
  styleUrls: ['./ticket-seller-dialog.component.scss']
})
export class TicketSellerDialogComponent implements OnInit {
  private serverUrl = config.baseurl ; 
  private ticketSubscription: Subscription;
  private ticketRecordSubscription: Subscription;
  private source: DialogData;
  private countData: CountData;
  private recordDataSource: MatTableDataSource<CountData[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  i10n = {
    "sell" : "购买",
    "recycling" : "收回"
  }
  displayedColumns: string[] = ['时间', '数量', 'Action'];

  loading:boolean = false;
  done:boolean = false;
  returnMsg: string = "";
  
  breakfastNumber:number = 0 ;
  lunchNumber:number = 0 ;
  dinnerNumber:number = 0;

  constructor( private apollo: Apollo,public dialogRef: MatDialogRef<TicketSellerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.source = data;
    }

  ngOnInit() {
    this.queryTickets();
    this.queryTicketRecords();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  queryTickets():void{
    this.loading = true  ;
    this.ticketSubscription = this.apollo.watchQuery({
      query: ServiceGQl.ticketCountGQL,
      variables: {
        userId:this.source.user.id
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
        this.loading = false  ;
        this.countData = result["data"]["tickets"]["count"];
    },(error)=>{
      this.loading = false  ;
      alert("error:"+error);
    });
  }

  queryTicketRecords():void{
    this.loading = true  ;
    this.ticketRecordSubscription = this.apollo.watchQuery({
      query: ServiceGQl.ticketRecordsGQL,
      variables: {
        owner:this.source.user.id
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
        this.loading = false  ;
        let recordsData = result["data"]["ticketRecords"]["rows"];
        this.recordDataSource = new MatTableDataSource<CountData[]>(recordsData);
        this.recordDataSource.paginator = this.paginator;
    },(error)=>{
      this.loading = false  ;
      alert("error:"+error);
    });
  }

  sellOrRecycling(action:string,  ticketType:string):void{
    let gqlstring = "";
    switch(action){
      case "sell" : {
        gqlstring = ServiceGQl.sellTicketGQL;
        break ;
      }
      case "recycling" : {
        gqlstring = ServiceGQl.recyclingTicketGQL;
        break ;
      }
    }
    let number = 0 ;
    let tType = 0;
    switch (ticketType) {
      case "breakfast" : {
        number = this.breakfastNumber;
        tType = 1 ; 
        break ;
      }
      case "lunch" : {
        number = this.lunchNumber;
        tType = 2 ; 
        break ;
      }
      case "dinner" : {
        number = this.dinnerNumber; 
        tType = 3 ; 
        break ;
      }
    }
    console.log("number", number)
    this.done = false ;
    this.loading = true;
    this.apollo.mutate({
      mutation: gqlstring,
      variables: {
        userId: this.source.user.id,
        number,
        type:tType,
      },
    }).subscribe((data) => {
      this.loading = false;
      this.done = true ;
      this.queryTickets();
    },(error) => {
      this.loading = false;
      this.done = true ;
      this.returnMsg = error;
    });
  }

}
