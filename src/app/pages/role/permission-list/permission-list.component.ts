import { Component, AfterViewInit , OnDestroy,ViewChild,Input,Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription, of as observableOf } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ServiceGQl } from '../../../service/graphql';
import { Role } from 'src/app/model/role';
import { Permission } from 'src/app/model/permission';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements  AfterViewInit , OnDestroy  {
  private subscription: Subscription;

  resultsLength = 0;
  isLoadingResults = true;

  currentRole:Role = new Role();
  permissionModules:string[] = [];
  permissions:Map<string,Permission[]> = new Map<string,Permission[]>();   
  checkedPerms = {};

  @Input()
  set role(role:Role){
    if ( role  ) {
      this.currentRole = role ; 
      this.queryPermissions(null);
    }else{
      this.currentRole = new Role() ; 
    }
  }

  constructor(public dialog: MatDialog,private apollo: Apollo) { }

  ngAfterViewInit() {}

  queryPermissions(filter:Map<string,string>):void{
    let roleName = "";

    if ( this.currentRole ) {
      roleName = this.currentRole.name ; 

    }
    this.isLoadingResults = true  ;
    this.subscription = this.apollo.watchQuery({
      query: ServiceGQl.queryPermissionsGQL,
      variables: {
        name:roleName, 
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
        this.isLoadingResults = false  ;
        this.resultsLength = result.data['permissions']['totalCount'];
        let permissions =  result.data['permissions']['rows'];
        this.permissions.clear();
        this.permissionModules = [];
        for (let i=0 ;i< permissions.length ; i++){
          let m = permissions[i].module; 
          let temp:Permission[] = [] ;
          if ( this.permissions.get(m) ) {
            temp = this.permissions.get(m) ; 
          }
          temp.push(permissions[i]);
          temp.sort();
          this.permissions.set(m, temp );
        }

        this.permissionModules = Array.from(this.permissions.keys() );
        this.permissionModules.sort();
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
  }

  onChange(moduleName:string, index:number):void {
    this.permissions.get(moduleName)[index].checked = !this.permissions.get(moduleName)[index].checked;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save():void{
    let perms:string[] = [];
    for(let i=0;i< this.permissionModules.length ;i++){
        let key = this.permissionModules[i];
        
        let list =  this.permissions.get(key) ; 

        for(let j=0; j < list.length ; j++){
            if ( list[j].checked ){
              perms.push(list[j].object);
            }
        }
    }

    this.isLoadingResults = true  ;
    this.apollo.mutate({
      mutation: ServiceGQl.createRoleAndPermissionRelationshipGQL,
      variables: {
        role:this.currentRole.name,
        permissions: perms 
      },
    }).subscribe((data) => {
      this.isLoadingResults = false;
    },(error) => {
      this.isLoadingResults = false;
    });
  }

}
