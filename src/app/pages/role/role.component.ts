import { Component, AfterViewInit , OnDestroy,ViewChild } from '@angular/core';
import { MatPaginator, MatSort,MatTableDataSource }  from '@angular/material';
import { Apollo } from 'apollo-angular';
import { merge, Subscription, of as observableOf } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ServiceGQl } from '../../service/graphql';
import { catchError } from 'rxjs/operators';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements  AfterViewInit , OnDestroy  {
  private subscription: Subscription;
  private userSubscription: Subscription;

  returnMsg:string = "";
  displayedColumns: string[] = ['ID','name','Actions'];
  dataSource: MatTableDataSource<Role> ;
  userDataSource: MatTableDataSource<User> ;
  loading = true;
  error: any;
  resultsLength = 0;
  isLoadingResults = true;
  defaultLimit = 10 ;
  offset:number = 0 ;
  limit:number = this.defaultLimit ;
  filter:Map<string,string> ;

  defaultTake = 10 ;
  skip:number = 0 ;
  take:number = this.defaultTake ;

  currentRole:Role; 
  
  showUserList:boolean = false;
  showPermissionList:boolean = false; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,private apollo: Apollo) { }

  ngAfterViewInit() {
    this.queryRoles(null);
    try{
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
          this.queryRoles(null);
        });
    }catch{
      
    }
    
  }

  queryRoles(filter:Map<string,string>):void{
    let name = "";
    if ( filter != null ){
       name = filter.get("name");
    }
    this.isLoadingResults = true  ;
    this.subscription = this.apollo.watchQuery({
      query: ServiceGQl.queryRolesGQL,
      variables: {
        skip: this.skip,
        take: this.take,
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
        this.isLoadingResults = false  ;
        this.resultsLength = result.data['roles']['totalCount'];
        this.dataSource = new MatTableDataSource(result.data['roles']['rows']);
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
  }

  onQueryUsers(role:Role):void{
    this.currentRole = role ; 
    this.showUserList = true; 
    this.showPermissionList = false; 
  }

  onQueryPermissions(role:Role):void{
    this.currentRole = role ; 
    this.showUserList = false; 
    this.showPermissionList = true; 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
