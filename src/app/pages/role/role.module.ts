import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomMaterialModule } from '../../core/material.module';
import { RoleRoutingModule } from './role-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { CanAccessDirective } from 'src/app/directive/can-access.directive';

const COMPONENTS = [
  RoleComponent,
  UserListComponent,
];

const SERVICES = [
];

const MODULES = [
  RoleRoutingModule,
  CommonModule,
  SharedModule,
  CustomMaterialModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
    PermissionListComponent,
    CanAccessDirective,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class RoleModule { }