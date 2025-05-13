import { Component } from '@angular/core';
import { ContratsCoursComponent } from './cards/contrats-cours/contrats-cours.component';
import { CommonModule } from '@angular/common';
import { ContratsAlerteComponent } from "./cards/contrats-alerte/contrats-alerte.component";
import { RepartitionTypesComponent } from './repartition/repartition-types/repartition-types.component';
import { EcheancesMoisComponent } from "./echeances/echeances-mois/echeances-mois.component";
import { ContratsEnAlerteComponent as ContratsEnAlerteComponent } from "./alertes/contrats-en-alerte/contrats-en-alerte.component"; // ajuste le chemin si besoin


@Component({
  selector: 'app-dashboard-admin',
  imports: [CommonModule, ContratsCoursComponent, ContratsAlerteComponent, RepartitionTypesComponent,
    EcheancesMoisComponent, EcheancesMoisComponent, ContratsEnAlerteComponent, ContratsEnAlerteComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

}
