import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Dashboard } from './pages/dashboard/dashboard';
import { RegistrarCultivo } from './pages/cultivo/registrar-cultivo/registrar-cultivo';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'registrar-cultivo',
    component: RegistrarCultivo
  }

];