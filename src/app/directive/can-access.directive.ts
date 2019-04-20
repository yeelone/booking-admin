import { Directive ,Input,OnInit, OnDestroy,TemplateRef,ViewContainerRef} from '@angular/core';
import { Permission } from '../model/permission';
import { User } from '../model/user';
import { Role } from '../model/role';
import config from '../config/config';

@Directive({
  selector: '[appCanAccess]'
})
export class CanAccessDirective  implements OnInit, OnDestroy{
  @Input('appCanAccess') appCanAccess: string[];

  permissions: Permission[] = [];
  authorized:boolean = false ;
  accessMap:Map<string,boolean>= new Map<string,boolean>();
  service = null ;
  role: Role;
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
          ) {
  }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || new User();
    let permissions = localStorage.getItem('permissions') || "" ;
    let perms = permissions.split(",");

    if (Object.keys(currentUser).length ){
      if (  currentUser['roles']['rows'].length ){
        this.role = currentUser['roles']['rows'][0];
      }
    }
    if ( perms.length ){
      for(let i=0;i<perms.length;i++){
        this.accessMap.set(perms[i], true);
      }

      this.applyPermission();
      return ;
    }

    if ( !this.role ) return ;
  
  }

  private applyPermission(): void { 

    if ( this.role.name === config.highestRole ){
      this.authorized = true ;
    }else{
      for(let key of this.appCanAccess){
        if ( this.accessMap.get(key)){
          this.authorized = true; 
        }
      }
    }
    
    if (this.authorized) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy(): void {
    if ( this.service) {
      this.service.unsubscribe();
    }
    
  }

}