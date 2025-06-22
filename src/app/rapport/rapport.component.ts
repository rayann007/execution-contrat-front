import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContratService } from '../../services/contrat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-rapport',
  imports: [CommonModule, FormsModule],
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css'
})
export class RapportComponent {
contrats: any[] = [];
  contratsParCouleurIds: number[] = [];

  searchText: string = '';
  selectedType: string = '';
  selectedColor: string = '';
  selectedService: string = '';
  dateDebutFiltre: string = '';
  dateFinFiltre: string = '';
  constructor(private contratService: ContratService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.contratService.getAllContrats().subscribe({
      next: data => this.contrats = data,
      error: err => console.error('Erreur chargement contrats', err)
    });

    if (this.selectedColor) {
      this.updateContratsParCouleur(this.selectedColor);
    }
  }

  updateContratsParCouleur(couleur: string): void {
    if (!couleur) {
      this.contratsParCouleurIds = [];
      return;
    }

    this.contratService.getContratsParCouleur(couleur).subscribe({
      next: data => {
        this.contratsParCouleurIds = data.map(e => e.contrat.id);
      },
      error: err => console.error('Erreur filtrage couleur', err)
    });
  }

  contratsFiltres() {
    return this.contrats.filter(c => {
      const matchNom = !this.searchText || c.nomContrat?.toLowerCase().includes(this.searchText.toLowerCase());
      const matchType = !this.selectedType || c.type === this.selectedType;
      const matchService = !this.selectedService || c.serviceConcerne === this.selectedService;

      const debutContrat = new Date(c.dateDebut);
      const dateDebutValide = !this.dateDebutFiltre || debutContrat >= new Date(this.dateDebutFiltre);
      const dateFinValide = !this.dateFinFiltre || debutContrat <= new Date(this.dateFinFiltre);

      const matchCouleur = !this.selectedColor || this.contratsParCouleurIds.includes(c.id);

      return matchNom && matchType && matchService && dateDebutValide && dateFinValide && matchCouleur;
    });
  }

evaluerContrat(contratId: number): void {
  this.http.get<any>(`http://localhost:8081/api/evaluations/statistiques/${contratId}`)
  .subscribe({
    next: (evaluationStats) => {
      console.log("Statistiques d'évaluation : ", evaluationStats);
      const hasEvaluations = evaluationStats.totalDelais > 0;
      if (hasEvaluations) {
        this.router.navigate(['/rapport-contrat', contratId]);
      } else {
        this.router.navigate(['/evaluer-contrat', contratId]);
      }
    },
    error: err => {
      console.error("Erreur lors de la vérification des évaluations", err);
      this.router.navigate(['/evaluer-contrat', contratId]); // fallback
    }
  });

}

}
