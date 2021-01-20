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

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit , OnDestroy {
  returnMsg:string = "";

  displayedColumns: string[] = ['select','Actions','ID','username','email','picture'];

  dataSource: MatTableDataSource<User> ;
  loading = true;
  deleteLoading = false;

  error: any;

  disableDelBtn = true ; //禁用删除按钮

  resultsLength = 0;
  isLoadingResults = true;

  defaultLimit = 10 ;
  offset:number = 0 ;
  limit:number = this.defaultLimit ;

  filter:Map<string,string> ;

  selectedSearchType:string  = "username";
  searchTypes = [
    {value: 'username', viewValue: 'username'},
    {value: 'email', viewValue: 'email'},
  ];

  selection = new SelectionModel<User>(true, []);

  private userSubscription: Subscription;

  defaultTake = 10 ;
  skip:number = 0 ;
  take:number = this.defaultTake ;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,private apollo: Apollo) { }

  ngAfterViewInit() {
    this.queryUsers(null);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {

        if ( data['pageSize'] != this.take ) {
          this.take = data['pageSize'] ;
          this.skip =  0 ;
        }else{
          this.skip = this.take * data['pageIndex'];
        }
        this.queryUsers(null);
      });
  }

  getUsers():void {
     this.loading = true ; 
  }

  queryUsers(filter:Map<string,string>):void{
    let username = "";
    let email = "";
    if ( filter != null ){
      username = filter.get("username");
      email = filter.get("email");
    }
    this.isLoadingResults = true  ;
    this.userSubscription = this.apollo.watchQuery({
      query: ServiceGQl.userGQL,
      variables: {
        skip: this.skip,
        take: this.take,
        username,
        email,
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
      this.isLoadingResults = false  ;
        this.resultsLength = result.data['users']['totalCount'];
        const users = result.data['users']['rows'] ;
        this.dataSource = new MatTableDataSource(users);
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
  }
  
  openEditDialog(user:User):void{
    
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '800px',
      maxHeight:'600px',
      // disableClose:true,
      data: {user: Object.assign({}, user)}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  isAllSelected():boolean{
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle():void{
    this.disableDelBtn = !this.disableDelBtn;
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  singleChange(row:User):void{
    this.selection.toggle(row);
    if (this.selection.selected.length == 0 ){
      this.disableDelBtn = true ;
    }else{
      this.disableDelBtn = false;
    }
  }

  applyFilter(filterValue: string) {
    let filter = new Map<string,string>();
    if (this.selectedSearchType == ""){
      this.selectedSearchType = "username";
    }
    filter.set(this.selectedSearchType, filterValue);
    this.queryUsers(filter);
  }

  deleteUsers():void{
    let ids:number[] = [];
    
    for (let i= 0;i< this.selection.selected.length;i++){
      ids.push(this.selection.selected[i].id);
    }

    if (ids.length == 0 ){

      return ;
    }
    this.deleteLoading = true  ;
    this.apollo.mutate({
      mutation: ServiceGQl.deleteUserGQL,
      variables: {
        ids,
      },
    }).subscribe((data) => {
      this.deleteLoading = false;
      this.returnMsg = "delete successed";
      this.skip = 0 ;
      this.take = this.defaultTake;
      this.selection.clear();
      this.disableDelBtn = true ;
      this.queryUsers(null);
    },(error) => {
      this.deleteLoading = false;
      this.returnMsg = error;
    });
  }

  resetPassword():void{
    let ids:number[] = [];
    
    for (let i= 0;i< this.selection.selected.length;i++){
      ids.push(this.selection.selected[i].id);
    }

    if (ids.length == 0 ){
      return ;
    }
    this.isLoadingResults = true  ;
    this.apollo.mutate({
      mutation: ServiceGQl.resetUserPasswordGQL,
      variables: {
        ids,
      },
    }).subscribe((result) => {
      this.isLoadingResults = false;
      let defaultPwd = result.data['resetPassword'];
      alert("密码已重置，默认密码为:" + defaultPwd );
    },(error) => {
      this.isLoadingResults = false;
      this.returnMsg = error;
    });
  }

}
