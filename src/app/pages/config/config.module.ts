import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { ConfigRoutingModule } from './config-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomMaterialModule } from 'src/app/core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MODULES = [
  ConfigRoutingModule,
  CommonModule,
  SharedModule,
  CustomMaterialModule,
  FormsModule,
  ReactiveFormsModule,
];


@NgModule({
  declarations: [ConfigComponent],
  imports: [
    ...MODULES,
  ]
})
export class ConfigModule { }
