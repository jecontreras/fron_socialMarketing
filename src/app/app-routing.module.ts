import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', 
    children: [{
      path: '',
      loadChildren: './paginas/paginas.module#PaginasModule'
    }]
  },
  {
    path: 'dashboard', 
    children: [{
      path: '',
      loadChildren: './paginas/dashboard-user/dashboard-user.module#DashboardUserModule'
    }]
  }
  /*{
    path: 'publico',
    loadChildren: () => import('./paginas/publico/publico.module').then( m => m.PublicoModule)
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
