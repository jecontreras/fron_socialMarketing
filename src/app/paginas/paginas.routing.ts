import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      },
      /*{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaRoutingModule { }
