import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DashboardUserModule } from './dashboard-user/dashboard-user.module';
import { LoginComponent } from './components/login/login.component';
import { PaginaRoutingModule } from './paginas.routing';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PaginaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DashboardUserModule
  ]
})
export class PaginasModule { }
