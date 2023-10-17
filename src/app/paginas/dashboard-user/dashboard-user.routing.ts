import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { FormContratoComponent } from './forms/form-contrato/form-contrato.component';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { FormUsuarioComponent } from './forms/form-usuario/form-usuario.component';
import { FormMensajesComponent } from './forms/form-mensajes/form-mensajes.component';
import { PerfilComponent } from './relleno/perfil/perfil.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { FormWhatsappComponent } from './forms/form-whatsapp/form-whatsapp.component';
import { PlataformasComponent } from './components/plataformas/plataformas.component';
import { FormPlataformasComponent } from './forms/form-plataformas/form-plataformas.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { FormGaleriaComponent } from './forms/form-galeria/form-galeria.component';
import { LogicWhsatsappComponent } from './components/logic-whsatsapp/logic-whsatsapp.component';
import { FormLogicWhatsappComponent } from './forms/form-logic-whatsapp/form-logic-whatsapp.component';
import { WhatsappInfoComponent } from './components/whatsapp-info/whatsapp-info.component';
import { FormWhatsappInfoComponent } from './forms/form-whatsapp-info/form-whatsapp-info.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthService],
        children: [
          {path: '', redirectTo: 'home', pathMatch: 'full'},
          {
            path: 'home',
            component: ContenidoComponent
          },
          {
            path: 'contratoform',
            component: FormContratoComponent
          },
          {
            path: 'contratoform/:id',
            component: FormContratoComponent
          },
          {
            path: 'usuarios',
            component: UsuariosComponent
          },
          {
            path: 'usuariosform',
            component: FormUsuarioComponent
          },
          {
            path: 'usuariosform/:id',
            component: FormUsuarioComponent
          },
          {
            path: 'mensajes',
            component: MensajesComponent
          },
          {
            path: 'mensajesform',
            component: FormMensajesComponent
          },
          {
            path: 'mensajesform/:id',
            component: FormMensajesComponent
          },
          {
            path: 'whatsapp',
            component: WhatsappComponent
          },
          {
            path: 'whatsappform',
            component: FormWhatsappComponent
          },
          {
            path: 'whatsappform/:id',
            component: FormWhatsappComponent
          },
          {
            path: 'perfil',
            component: PerfilComponent
          },
          {
            path: 'plataforma',
            component: PlataformasComponent
          },
          {
            path: 'plataformaform',
            component: FormPlataformasComponent
          },
          {
            path: 'plataformaform/:id',
            component: FormPlataformasComponent
          },
          {
            path: 'galeria',
            component: GaleriaComponent
          },
          {
            path: 'galeriaform',
            component: FormGaleriaComponent
          },
          {
            path: 'galeriaform/:id',
            component: FormGaleriaComponent
          },
          {
            path: 'logicWhsatsapp',
            component: LogicWhsatsappComponent
          },
          {
            path: 'logicWhsatsappform',
            component: FormLogicWhatsappComponent
          },
          {
            path: 'logicWhsatsappform/:id',
            component: FormLogicWhatsappComponent
          },
          {
            path: 'whatsappInfo',
            component: WhatsappInfoComponent
          },
          {
            path: 'whatsappInfoform',
            component: FormWhatsappInfoComponent
          },
          {
            path: 'whatsappInfoform/:id',
            component: FormWhatsappInfoComponent
          },
          {path: '**', redirectTo: 'home', pathMatch: 'full'}
        ]
      },
      /*{
        path: '*',
        redirectTo: 'dashboard/home',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'dashboard/home',
        pathMatch: 'full'
      }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardUserRoutingModule { }
