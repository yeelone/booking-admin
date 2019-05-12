import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomMaterialModule } from '../../core/material.module';
import { GroupRoutingModule } from './group-routing.module';
import { UserComponent } from './user/user.component';
import { CanteenComponent } from './canteen/canteen.component';
import { CustomDirectiveModule } from 'src/app/directive/directive.module';
import { ErrorsComponent } from './errors/errors.component';

const MODULES = [
  GroupRoutingModule,
  CommonModule,
  SharedModule,
  CustomMaterialModule,
];

@NgModule({
  declarations: [GroupComponent, UserComponent, CanteenComponent, ErrorsComponent],
  imports: [
    ...MODULES,
    CustomDirectiveModule,
  ],
  entryComponents: [
    ErrorsComponent
  ],
})
export class GroupModule { }
