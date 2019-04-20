import { Component, AfterViewInit , OnDestroy,ViewChild } from '@angular/core';
import { MatPaginator, MatSort,MatTableDataSource }  from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Apollo } from 'apollo-angular';
import { merge, Subscription, of as observableOf } from 'rxjs';
import { MatDialog } from '@angular/material';
import { User } from '../../model/user';
import { ServiceGQl } from '../../service/graphql';
import { UserDialogComponent } from 'src/app/shared/dialog/user-dialog/user-dialog.component';
import { catchError } from 'rxjs/operators';
import { Dashboard } from 'src/app/model/dashboard';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements  AfterViewInit , OnDestroy {
  private dataSubscription: Subscription;
  isLoadingResults = true;

  data: Dashboard ;
  constructor(private apollo: Apollo) { }

  ngAfterViewInit() {
    this.queryData();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  queryData():void{
    this.isLoadingResults = true  ;
    this.dataSubscription = this.apollo.watchQuery({
      query: ServiceGQl.queryDashboardGQL,
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
        this.isLoadingResults = false  ;
        this.data = result.data['dashboard'];
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
  }


}
