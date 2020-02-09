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
