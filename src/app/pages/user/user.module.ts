import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CustomMaterialModule } from '../../core/material.module';

const COMPONENTS = [
  UserComponent,
];

const SERVICES = [
];

const MODULES = [
  UserRoutingModule,
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
  ],
  providers: [
    ...SERVICES,
  ],
})
export class UserModule { }
