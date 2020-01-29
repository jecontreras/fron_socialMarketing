import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardUserRoutingModule } from './dashboard-user.routing';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardUserRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardUserModule { }
