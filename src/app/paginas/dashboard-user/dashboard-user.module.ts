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
import { DriveComponent } from './components/drive/drive.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { MandadosComponent } from './components/mandados/mandados.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormDriveComponent } from './forms/form-drive/form-drive.component';
import { FormUsuarioComponent } from './forms/form-usuario/form-usuario.component';
import { FormMensajesComponent } from './forms/form-mensajes/form-mensajes.component';
import { FormMandadosComponent } from './forms/form-mandados/form-mandados.component';



@NgModule({
  declarations: [DashboardComponent, ContenidoComponent, MenuComponent, HeaderComponent, SettingsComponent, ContratoComponent, FacturasComponent, MainComponent, FormContratoComponent, FormFacturasComponent, DriveComponent, UsuariosComponent, MensajesComponent, MandadosComponent, FormDriveComponent, FormUsuarioComponent, FormMensajesComponent, FormMandadosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    DashboardUserRoutingModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardUserModule { }
