import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';

import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,MatCheckboxModule,MatSortModule,MatExpansionModule,MatDatepickerModule,MatNativeDateModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatPaginatorModule,MatProgressBarModule,MatSelectModule,MatFormFieldModule, MatSidenavModule,MatSnackBarModule
} from '@angular/material';
@NgModule({
  imports: [
  CommonModule, 
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatSortModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule, 
  ],
  exports: [
  CommonModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatPaginatorModule,
   MatProgressBarModule,
   MatSelectModule,
   MatCheckboxModule,
   MatSortModule,
   MatExpansionModule,
   MatDatepickerModule,
   MatNativeDateModule, 
   ],
})
export class CustomMaterialModule { }