import { Component, OnInit,AfterViewInit , OnDestroy } from '@angular/core';
import { ServiceGQl } from '../../service/graphql';
import { Apollo } from 'apollo-angular';
import { MatDialog } from '@angular/material';
import { merge, Subscription, of as observableOf } from 'rxjs';
import { Group } from 'src/app/model/group';
import {FormControl} from '@angular/forms';
import { User } from 'src/app/model/user';
import { Role } from 'src/app/model/role';
import config from 'src/app/config/config';
import { GroupDialogComponent } from 'src/app/shared/dialog/group-dialog/group-dialog.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements AfterViewInit , OnDestroy {
  isLoadingResults:boolean = true ; 
  userSubscription: Subscription;
  defaultTake = 50 ;
  skip:number = 0 ;
  take:number = this.defaultTake ;
  baseUrl:string = "";
  resultsLength = 0;
  groups:Group[] = [];

  newTabs = [];
  selected = new FormControl(0);

  avatar:string = config.baseurl + "/assets/canteen-min.jpg";
  constructor(public dialog: MatDialog,private apollo: Apollo) { 
    this.baseUrl = config.baseurl;
  }

  ngAfterViewInit() {
    this.queryGroups(null);
  }

  queryGroups(filter:Map<string,string>):void{
    let name = "";
    if ( filter != null ){
      name = filter.get("name");
    }
    this.isLoadingResults = true  ;
    this.userSubscription = this.apollo.watchQuery({
      query: ServiceGQl.groupGQL,
      variables: {
        skip: this.skip,
        take: this.take,
        name,
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
        this.isLoadingResults = false  ;
        this.resultsLength = result.data['groups']['totalCount'];
        this.groups = result.data['groups']['rows'] ;
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
  }

  isAdmin(group:Group):boolean {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || new User();
    let role = new Role();

    if (  currentUser['roles']['rows'].length ){
      role = currentUser['roles']['rows'][0];
    }else{
      return false; 
    }

    if ( role.name === config.highestRole ){ //如果是系统管理员，默认是允许的
      return true ; 
    }

    if ( currentUser.id == group.adminInfo.id ){
      return true ; 
    }

    return false;
  }

  openEditDialog(group:Group):void{
    
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      width: '800px',
      maxHeight:'600px',
      // disableClose:true,
      data: {group: Object.assign({}, group )}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.queryGroups(null);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
