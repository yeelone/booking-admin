import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {MatButtonModule} from '@angular/material';
import { UserRoutingModule } from './user-routing.module';

const COMPONENTS = [
  UserComponent
];

const SERVICES = [
];

const MODULES = [
  UserRoutingModule,
  MatButtonModule,
  CommonModule,
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
