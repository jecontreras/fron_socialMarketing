import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { MainComponent } from './main/main.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { FormContratoComponent } from './forms/form-contrato/form-contrato.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormFacturasComponent } from './forms/form-facturas/form-facturas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DriveComponent } from './components/drive/drive.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { MandadosComponent } from './components/mandados/mandados.component';
import { FormDriveComponent } from './forms/form-drive/form-drive.component';
import { FormUsuarioComponent } from './forms/form-usuario/form-usuario.component';
import { FormMensajesComponent } from './forms/form-mensajes/form-mensajes.component';

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
            path: 'contrato',
            component: ContratoComponent
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
            path: 'facturas',
            component: FacturasComponent
          },
          {
            path: 'facturasform/:id',
            component: FormFacturasComponent
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
            path: 'drives',
            component: DriveComponent
          },
          {
            path: 'drivesform',
            component: FormDriveComponent
          },
          {
            path: 'drivesform/:id',
            component: FormDriveComponent
          },
          {
            path: 'mensajes',
            component: MensajesComponent
          },
          {
            path: 'mensajesform/:id',
            component: FormMensajesComponent
          },
          {
            path: 'mandados',
            component: MandadosComponent
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
