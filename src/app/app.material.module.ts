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
  MatCheckboxModule,
  MatTabsModule
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
    MatCheckboxModule,
    MatTabsModule
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
    MatCheckboxModule,
    MatTabsModule
  ],
})
export class MyOwnCustomMaterialModule { }
