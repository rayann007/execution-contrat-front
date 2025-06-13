import { Component, OnInit } from '@angular/core';
import { ContratsContinuService } from '../../../services/contrats-continu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suivre-contrat-continue',
  imports: [CommonModule,
    FormsModule],
  templateUrl: './suivre-contrat-continue.component.html',
  styleUrls: ['./suivre-contrat-continue.component.css']
})
export class SuivreContratContinueComponent implements OnInit {
  contrats: any[] = [];

  // filtres
  searchText: string = '';
  selectedType: string = '';
  selectedService: string = '';
  dateDebutFiltre?: string;
  dateFinFiltre?: string;
  router: Router = new Router;

  constructor(private contratService: ContratsContinuService) {}

  ngOnInit(): void {
    this.contratService.getAll().subscribe({
      next: (data) => {
        this.contrats = data;
        console.log("✅ Contrats reçus :", data);
      },
      error: (err) => {
        console.error("❌ Erreur de chargement des contrats :", err);
      }
    });
  }

  contratsFiltres(): any[] {
    return this.contrats.filter(contrat => {
      const searchTextMatch = !this.searchText || contrat.contrat?.nomContrat.toLowerCase().includes(this.searchText.toLowerCase());
      const typeMatch = !this.selectedType || contrat.typeService === this.selectedType.toLowerCase();
      const serviceMatch = !this.selectedService || contrat.contrat?.serviceConcerne === this.selectedService;

      const dateDebut = new Date(contrat.contrat?.dateDebut);
      const dateFin = new Date(contrat.contrat?.dateFin);

      const debutFiltreOk = !this.dateDebutFiltre || dateDebut >= new Date(this.dateDebutFiltre);
      const finFiltreOk = !this.dateFinFiltre || dateFin <= new Date(this.dateFinFiltre);

      return searchTextMatch && typeMatch && serviceMatch && debutFiltreOk && finFiltreOk;
    });
  }

  voirDetails(id: number): void {
    console.log("🔍 Voir détails pour le contrat ID:", id);
    this.router.navigate(['contrat-continue', id]);
  }
}
