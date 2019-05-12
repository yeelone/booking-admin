import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../core/material.module';
import { UploaderComponent } from './uploader/uploader.component';
import { UserDialogComponent } from './dialog/user-dialog/user-dialog.component';
import { TicketSellerDialogComponent } from './dialog/ticket-seller-dialog/ticket-seller-dialog.component';
import { CanteenDialogComponent } from './dialog/canteen-dialog/canteen-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { QrcodeDialogComponent } from './dialog/qrcode-dialog/qrcode-dialog.component';
import { BookingListDialogComponent } from './dialog/booking-list-dialog/booking-list-dialog.component';
import { UserSelectorComponent } from './selector/user-selector/user-selector.component';
import { GroupDialogComponent } from './dialog/group-dialog/group-dialog.component';

const COMPONENTS = [
  ChangePasswordComponent,
  UploaderComponent,
  UserDialogComponent,
  TicketSellerDialogComponent,
  CanteenDialogComponent,
  ConfirmDialogComponent,
  QrcodeDialogComponent,
  BookingListDialogComponent,
  UserSelectorComponent,
  GroupDialogComponent,
];

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  CustomMaterialModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  exports:[
    ...COMPONENTS,
  ],
  imports:[
    ...MODULES,
  ],
  entryComponents: [
    ...COMPONENTS,
  ],
})
export class SharedModule { }
