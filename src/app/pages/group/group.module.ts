import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomMaterialModule } from '../../core/material.module';
import { GroupRoutingModule } from './group-routing.module';
import { UserComponent } from './user/user.component';
import { CanteenComponent } from './canteen/canteen.component';
import { CanAccessDirective } from 'src/app/directive/can-access.directive';

const MODULES = [
  GroupRoutingModule,
  CommonModule,
  SharedModule,
  CustomMaterialModule,
];

@NgModule({
  declarations: [GroupComponent, UserComponent, CanteenComponent,CanAccessDirective],
  imports: [
    ...MODULES,
  ],
})
export class GroupModule { }
