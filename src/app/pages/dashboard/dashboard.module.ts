import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomMaterialModule } from 'src/app/core/material.module';

const COMPONENTS = [
  DashboardComponent
];

const SERVICES = [
];

const MODULES = [
  DashboardRoutingModule,
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
export class DashboardModule { }
