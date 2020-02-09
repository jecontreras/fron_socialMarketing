//settings
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardUserRoutingModule } from './dashboard-user.routing';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { MenuComponent } from './relleno/menu/menu.component';
import { HeaderComponent } from './relleno/header/header.component';
import { SettingsComponent } from './relleno/settings/settings.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { MainComponent } from './main/main.component';
import { FormContratoComponent } from './forms/form-contrato/form-contrato.component';
import { FormFacturasComponent } from './forms/form-facturas/form-facturas.component';



@NgModule({
  declarations: [DashboardComponent, ContenidoComponent, MenuComponent, HeaderComponent, SettingsComponent, ContratoComponent, FacturasComponent, MainComponent, FormContratoComponent, FormFacturasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    DashboardUserRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardUserModule { }
