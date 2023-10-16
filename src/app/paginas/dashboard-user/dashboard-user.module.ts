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
import { MainComponent } from './main/main.component';
import { FormContratoComponent } from './forms/form-contrato/form-contrato.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormUsuarioComponent } from './forms/form-usuario/form-usuario.component';
import { FormMensajesComponent } from './forms/form-mensajes/form-mensajes.component';
import { FormMandadosComponent } from './forms/form-mandados/form-mandados.component';
import { PerfilComponent } from './relleno/perfil/perfil.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MyOwnCustomMaterialModule } from 'src/app/app.material.module';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { FormWhatsappComponent } from './forms/form-whatsapp/form-whatsapp.component';
import { PlataformasComponent } from './components/plataformas/plataformas.component';
import { FormPlataformasComponent } from './forms/form-plataformas/form-plataformas.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { FormGaleriaComponent } from './forms/form-galeria/form-galeria.component';
import { QRCodeModule } from 'angularx-qrcode';
import { GuiaComponent } from './components/guia/guia.component';
import { FormsGuiaComponent } from './forms/forms-guia/forms-guia.component';
import { LogicWhsatsappComponent } from './components/logic-whsatsapp/logic-whsatsapp.component';
import { FormLogicWhatsappComponent } from './forms/form-logic-whatsapp/form-logic-whatsapp.component';



@NgModule({
  entryComponents:[
    FormUsuarioComponent
  ],
  declarations: [DashboardComponent, MainComponent, ContenidoComponent, MenuComponent, HeaderComponent, SettingsComponent, FormContratoComponent, UsuariosComponent, MensajesComponent, FormUsuarioComponent, FormMensajesComponent, FormMandadosComponent, PerfilComponent, WhatsappComponent, FormWhatsappComponent, PlataformasComponent, FormPlataformasComponent, GaleriaComponent, FormGaleriaComponent, GuiaComponent, FormsGuiaComponent, LogicWhsatsappComponent, FormLogicWhatsappComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    DashboardUserRoutingModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    AngularEditorModule,
    MyOwnCustomMaterialModule,
    QRCodeModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardUserModule { }
