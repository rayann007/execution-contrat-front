import { Component } from '@angular/core';
import {ContratsNettoyageComponent} from './cards/contrats-nettoyage/contrats-nettoyage.component';
import {ContratsGardiennageComponent} from './cards/contrats-gardiennage/contrats-gardiennage.component';
import {ContratsRestaurationComponent} from './cards/contrats-restauration/contrats-restauration.component';
import {ContratsAlerteComponent} from './cards/contrats-alerte/contrats-alerte.component';
import { EcheanceComponent } from './echeance/echeance.component';
import { ContratEnAlerteComponent } from './contrat-en-alerte/contrat-en-alerte.component';
@Component({
  selector: 'app-dashboard-chef-service',
  imports: [ContratsNettoyageComponent, ContratsGardiennageComponent, ContratsRestaurationComponent, ContratsAlerteComponent,EcheanceComponent,ContratEnAlerteComponent],
  templateUrl: './dashboard-chef-service.component.html',
  styleUrl: './dashboard-chef-service.component.css'
})
export class DashboardChefServiceComponent {

}
