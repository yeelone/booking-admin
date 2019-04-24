import { Component, AfterViewInit , OnDestroy,ViewChild,Inject, Output,EventEmitter } from '@angular/core';
import { MatPaginator, MatSort,MatTableDataSource }  from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Apollo } from 'apollo-angular';
import { merge, Subscription, of as observableOf } from 'rxjs';
import { User } from '../../../model/user';
import { ServiceGQl } from '../../../service/graphql';
import { UserDialogComponent } from 'src/app/shared/dialog/user-dialog/user-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { catchError } from 'rxjs/operators';
import { Role } from 'src/app/model/role';


export interface DialogData {
  name: string;
  users: User[];
  role: Role;
}

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements  AfterViewInit , OnDestroy {
  private userSubscription: Subscription;
  private checkSubscription: Subscription;
  private source: DialogData;
  users:User[] = [];
  returnMsg:string = "";
  displayedColumns: string[] = ['select','ID','username','email'];
  dataSource: MatTableDataSource<User> ;
  loading = true;
  deleteLoading = false;
  error: any;
  disableBtn = true ; //禁用删除按钮
  resultsLength = 0;
  isLoadingResults = true;
  defaultTake = 10 ;
  skip:number = 0 ;
  take:number = this.defaultTake ;
  filter:Map<string,string> ;
  selectedSearchType:string  = "username";
  searchTypes = [
    {value: 'username', viewValue: 'username'},
    {value: 'email', viewValue: 'email'},
  ];
  selection = new SelectionModel<User>(true, []);
  
  @Output()
  onSubmit:EventEmitter<User[]> = new EventEmitter<User[]>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public dialogRef: MatDialogRef<UserSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog,private apollo: Apollo) { 
      this.source = data ; 
    }

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

  checkUserInRole():void{
    this.isLoadingResults = true  ;
    let ids:number[] = [];
    
    for(let i=0;i<this.users.length;i++){
      ids.push(this.users[i].id);
    }
    this.checkSubscription = this.apollo.watchQuery({
      query: ServiceGQl.checkUserNotInRoleGQL,
      variables: {
        skip: this.skip,
        take: this.take,
        roleId: this.source.role.id, 
        userIds: ids 
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
      this.isLoadingResults = false  ;
        let ids  = result.data['checkUserNotIntRole'] ;
        
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
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
        this.users = result.data['users']['rows'] ;
        this.dataSource = new MatTableDataSource(this.users);
        if ( this.source.role ) {
          this.checkUserInRole();
        }
        
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
  }
  
  ngOnDestroy() {
    this.userSubscription.unsubscribe();

    if ( this.checkSubscription ) {
      this.checkSubscription.unsubscribe();
    }
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit():void{
    let users: User[] = [];
    for (let i= 0;i< this.selection.selected.length;i++){
      users.push(this.selection.selected[i]);
    }

    this.onSubmit.emit(users);
    this.dialogRef.close();
    
  }
  
  isAllSelected():boolean{
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle():void{
    this.disableBtn = !this.disableBtn;
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  singleChange(row:User):void{
    this.selection.toggle(row);
    if (this.selection.selected.length == 0 ){
      this.disableBtn = true ;
    }else{
      this.disableBtn = false;
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

}
