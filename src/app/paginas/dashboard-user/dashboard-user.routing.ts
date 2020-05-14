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
import { FormMandadosComponent } from './forms/form-mandados/form-mandados.component';
import { PerfilComponent } from './relleno/perfil/perfil.component';

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
            path: 'mandadosform/:id',
            component: FormMandadosComponent
          },
          {
            path: 'perfil',
            component: PerfilComponent
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
