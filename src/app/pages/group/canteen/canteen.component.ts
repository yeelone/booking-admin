import { Component, AfterViewInit , OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription, of as observableOf } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ServiceGQl } from '../../../service/graphql';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/model/group';
import { Canteen } from 'src/app/model/canteen';
import { CanteenDialogComponent } from 'src/app/shared/dialog/canteen-dialog/canteen-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { QrcodeDialogComponent } from 'src/app/shared/dialog/qrcode-dialog/qrcode-dialog.component';
import { BookingListDialogComponent } from 'src/app/shared/dialog/booking-list-dialog/booking-list-dialog.component';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss']
})
export class CanteenComponent implements AfterViewInit , OnDestroy  {
  private canteenSubscription: Subscription;
  group:Group = new Group();
  canteens:Canteen[];
  resultsLength = 0;
  isLoadingResults = true;
  returnMsg:string = "";

  loading = true;
  deleteLoading = false;

  error: any;

  disableDelBtn = true ; //禁用删除按钮
  
  defaultLimit = 10 ;
  offset:number = 0 ;
  limit:number = this.defaultLimit ;

  filter:Map<string,string> ;

  defaultTake = 10 ;
  skip:number = 0 ;
  take:number = this.defaultTake ;

  constructor(private route:ActivatedRoute,public dialog: MatDialog,private apollo: Apollo) { }

  ngAfterViewInit() {
    this.queryGroup(null);
    this.queryCanteens(null);
  }

  queryCanteens(filter:Map<string,string>):void{
    let id = this.route.snapshot.paramMap.get('id');

    this.loading = true  ;
    this.canteenSubscription = this.apollo.watchQuery({
      query: ServiceGQl.canteensGQL,
      variables: {
        skip: this.skip,
        take: this.take,
        groupId:id,
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
      this.loading = false  ;
      this.resultsLength = result.data['canteens']['totalCount'];
      this.canteens = result.data['canteens']['rows'] ;
      console.log(this.canteens);
    },(error)=>{
      this.loading = false  ;
      alert("error:"+error);
    });
  }

  queryGroup(filter:Map<string,string>):void{
    let id = this.route.snapshot.paramMap.get('id');

    this.loading = true  ;
    this.canteenSubscription = this.apollo.watchQuery({
      query: ServiceGQl.groupGQL,
      variables: {
        skip: this.skip,
        take: this.take,
        id,
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
      this.loading = false  ;
      this.group = result["data"]["groups"]["rows"][0];
    },(error)=>{
      this.loading = false  ;
      alert("error:"+error);
    });
  }

  onDelete(canteen:Canteen):void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxHeight:'250px',
      disableClose:true,
      data: {name: canteen.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.delete(canteen.id);
      }
    });
  }

  delete(id:number):void{

    let ids:number[] = [id];
    this.loading = true  ;
    this.apollo.mutate({
      mutation: ServiceGQl.delCanteensGQL,
      variables: {
        ids,
      },
    }).subscribe((data) => {
      this.loading = false;
      this.skip = 0 ;
      this.take = this.defaultTake;
      this.queryCanteens(null);
    },(error) => {
      this.loading = false;
      this.returnMsg = error;
    });
  }

  openEditDialog(canteen:Canteen):void{
    
    const dialogRef = this.dialog.open(CanteenDialogComponent, {
      maxHeight:'800px',
      // disableClose:true,
      data: {canteen: Object.assign({}, canteen),groupId:this.group.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.queryCanteens(null);
    });
  }

  openQrcodeDialog(canteen:Canteen):void{
    
    const dialogRef = this.dialog.open(QrcodeDialogComponent, {
      maxHeight:'600px',
      // disableClose:true,
      data: {canteen: Object.assign({}, canteen)}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
  openBookingDialog(canteen:Canteen):void{
    const dialogRef = this.dialog.open(BookingListDialogComponent, {
      width:'600px',
      maxHeight:'600px',
      // disableClose:true,
      data: {canteen }
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.delete(canteen.id);
      }
    });
  }

  ngOnDestroy() {
    this.canteenSubscription.unsubscribe();
  }
}
