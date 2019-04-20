import { Component, AfterViewInit , OnDestroy,ViewChild,Input,Output } from '@angular/core';
import { MatPaginator, MatSort,MatTableDataSource }  from '@angular/material';
import { Apollo } from 'apollo-angular';
import { merge, Subscription, of as observableOf } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ServiceGQl } from '../../../service/graphql';
import { catchError } from 'rxjs/operators';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { UserSelectorComponent } from 'src/app/shared/selector/user-selector/user-selector.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit , OnDestroy {
  private subscription: Subscription;
  displayedColumns: string[] = ['select','ID','username'];
  dataSource: MatTableDataSource<User> ;
  selection = new SelectionModel<User>(true, []);

  returnMsg:string = "";
  error: any;

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
  disableDelBtn:boolean = true; 

  defaultTake = 10 ;
  skip:number = 0 ;
  take:number = this.defaultTake ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  role:Role = new Role();

  @Input()
  set roleId(rid:number){
    if ( rid > 0 ) {
      this.role.id = rid ; 
      let filter = new Map<string,string>();
      filter.set("rid", ""+ rid);
      this.queryRoleWithUsers(filter);
    }else{
      this.role = new Role() ; 
      this.dataSource= new MatTableDataSource<User>();
    }
    
  }

  constructor(public dialog: MatDialog,private apollo: Apollo) { }

  ngAfterViewInit() {
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
        let filter = new Map<string,string>();
        filter.set("rid", ""+ this.role.id);
        this.queryRoleWithUsers(filter);
      });
  }

  queryRoleWithUsers(filter:Map<string,string>):void{
    let username = "";
    let rid = "";

    if ( filter != null ){
      username = filter.get("username");
      rid = filter.get("rid")
   }

   if ( this.role ) {
      rid = ""+ this.role.id ; 
    }

    this.isLoadingResults = true  ;
    this.subscription = this.apollo.watchQuery({
      query: ServiceGQl.queryRoleWithUsersGQL,
      variables: {
        skip: this.skip,
        take: this.take,
        rid, 
        username,
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
        this.isLoadingResults = false  ;
        this.resultsLength = result.data['roles']['rows'][0]['users']['totalCount'];
        this.dataSource = new MatTableDataSource(result.data['roles']['rows'][0]['users']['rows']);
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
  }

  applyFilter(filterValue: string) {
    let filter = new Map<string,string>();
    if (this.selectedSearchType == ""){
      this.selectedSearchType = "username";
    }
    filter.set(this.selectedSearchType, filterValue);
    
    this.queryRoleWithUsers(filter);
  }

  isAllSelected():boolean{
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle():void{
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

  onRemoveUsers():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxHeight:'250px',
      disableClose:true,
      data: {name: this.role.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.removeUsers();
      }
    });
  }

  removeUsers():void{
    let ids:number[] = [];
    
    for (let i= 0;i< this.selection.selected.length;i++){
      ids.push(this.selection.selected[i].id);
    }

    if (ids.length == 0 ){
      return ;
    }
    this.isLoadingResults = true  ;
    this.apollo.mutate({
      mutation: ServiceGQl.remUserToRoleGQL,
      variables: {
        userIds:ids,
        roleId:this.role.id
      },
    }).subscribe((data) => {
      this.isLoadingResults = false;
      this.returnMsg = "delete successed";
      this.skip = 0 ;
      this.take = this.defaultTake;
      this.selection.clear();
      this.disableDelBtn = true ;
      this.queryRoleWithUsers(null);
    },(error) => {
      this.isLoadingResults = false;
      this.returnMsg = error;
    });
  }

  openUserDialog():void{
    const dialogRef = this.dialog.open(UserSelectorComponent, {
      width:'600px',
      maxHeight:'750px',
      // disableClose:true,
      data: {role: this.role }
    });

    dialogRef.componentInstance.onSubmit.subscribe((users:User[]) => {
       let ids:number[] = [];
       
       for (let i=0;i<users.length; i++){
         ids.push(users[i].id);
       }
      
       if (ids.length == 0 ){
        return ;
      }
      this.isLoadingResults = true  ;
      this.apollo.mutate({
        mutation: ServiceGQl.addUserToRoleGQL,
        variables: {
          userIds:ids,
          roleId:this.role.id
        },
      }).subscribe((data) => {
        this.isLoadingResults = false;
        this.returnMsg = "delete successed";
        this.skip = 0 ;
        this.take = this.defaultTake;
        this.selection.clear();
        this.disableDelBtn = true ;
        this.queryRoleWithUsers(null);
      },(error) => {
        this.isLoadingResults = false;
        this.returnMsg = error;
      });

    });

    dialogRef.afterClosed().subscribe(result => {
      this.queryRoleWithUsers(null);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
