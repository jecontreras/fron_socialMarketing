import {
  MatSliderModule,
  MatSidenavModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatSliderModule,
    MatSidenavModule
  ],
  exports: [
    MatSliderModule,
    MatSidenavModule
  ],
})
export class MyOwnCustomMaterialModule { }
