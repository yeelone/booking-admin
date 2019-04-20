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
import { UserListComponent } from './list/user-list/user-list.component';
import { UserSelectorComponent } from './selector/user-selector/user-selector.component';

const COMPONENTS = [
  ChangePasswordComponent,
  UserDialogComponent,
  TicketSellerDialogComponent,
  CanteenDialogComponent,
  ConfirmDialogComponent,
  QrcodeDialogComponent,
  BookingListDialogComponent,
  UserListComponent,
  UserSelectorComponent,
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
    UploaderComponent,
    UserDialogComponent,
    TicketSellerDialogComponent,
    CanteenDialogComponent,
    ConfirmDialogComponent,
    QrcodeDialogComponent,
    BookingListDialogComponent,
    UserListComponent,
    UserSelectorComponent,
  ],
  imports:[
    ...MODULES,
  ],
  entryComponents: [
    ...COMPONENTS,
  ],
})
export class SharedModule { }
