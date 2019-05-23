import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomMaterialModule } from 'src/app/core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const MODULES = [
  ReportRoutingModule,
  CommonModule,
  SharedModule,
  CustomMaterialModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [ReportComponent],
  imports: [
    ...MODULES,
  ]
})
export class ReportModule { }
