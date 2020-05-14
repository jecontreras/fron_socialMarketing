import {
  MatSliderModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatDialogModule,
  MatListModule,
  MatButtonModule,
  MatPaginatorModule,
  MatChipsModule,
  MatIconModule,
  MatFormFieldModule,
  MatCheckboxModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  exports: [
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
})
export class MyOwnCustomMaterialModule { }
