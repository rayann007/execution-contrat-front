import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { DashboardAdminComponent } from './dashboardAdmin/dashboard-admin.component';
import { CreateContratComponent } from './contrats/create/create-contrat.component';
import { ContratsComponent } from './contrats/contrats.component';
import { SuivreContratComponent } from './suivre-contrat/suivre-contrat.component';
import { DetailContratComponent } from './detail-contrat/detail-contrat.component';
import { ArchiveContratComponent } from './archive-contrat/archive-contrat.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ModifierContratComponent } from './detail-contrat/actions/modifier-contrat/modifier-contrat.component';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardAdminComponent },
  { path: 'contrats', component: ContratsComponent },
  { path: 'suivre-contrat', component: SuivreContratComponent },
  { path: 'contrat/:id', component: DetailContratComponent },
  { path: 'archives', component: ArchiveContratComponent },
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: 'modifier-contrat/:id', component: ModifierContratComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
