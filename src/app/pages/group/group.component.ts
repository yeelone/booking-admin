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

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements AfterViewInit , OnDestroy {
  isLoadingResults:boolean = true ; 
  
  private userSubscription: Subscription;
  defaultTake = 50 ;
  skip:number = 0 ;
  take:number = this.defaultTake ;

  resultsLength = 0;
  groups:Group[] = [];

  newTabs = [];
  selected = new FormControl(0);

  constructor(public dialog: MatDialog,private apollo: Apollo) { }

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
    let username  = group.adminInfo.username ; 
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

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
