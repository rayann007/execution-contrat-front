import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { DashboardAdminComponent } from './dashboardAdmin/dashboard-admin.component';
import { CreateContratComponent } from './contrats/create/create-contrat.component';
import { ContratsComponent } from './contrats/contrats.component';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardAdminComponent },
  { path: 'creer-contrat', component: CreateContratComponent },
  { path: 'contrats', component: ContratsComponent ,}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
