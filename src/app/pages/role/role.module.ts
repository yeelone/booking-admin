import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomMaterialModule } from '../../core/material.module';
import { RoleRoutingModule } from './role-routing.module';
import { RoleUserListComponent } from './user-list/user-list.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { CustomDirectiveModule } from 'src/app/directive/directive.module';

const COMPONENTS = [
  RoleComponent,
  RoleUserListComponent,
];

const SERVICES = [
];

const MODULES = [
  RoleRoutingModule,
  CommonModule,
  SharedModule,
  CustomMaterialModule,
  CustomDirectiveModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
    PermissionListComponent,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class RoleModule { }