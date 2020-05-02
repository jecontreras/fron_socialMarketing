import {
  MatSliderModule,
  MatSidenavModule,
  MatSnackBarModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],
  exports: [
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],
})
export class MyOwnCustomMaterialModule { }
