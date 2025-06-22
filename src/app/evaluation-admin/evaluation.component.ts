import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContratService } from '../../services/contrat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent implements OnInit {
  contrats: any[] = [];
  contratsParCouleurIds: number[] = [];

  searchText: string = '';
  selectedType: string = '';
  selectedColor: string = '';
  selectedService: string = '';
  dateDebutFiltre: string = '';
  dateFinFiltre: string = '';

  constructor(private contratService: ContratService, private router: Router) {}

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

  evaluerContrat(id: number): void {
    this.router.navigate(['/evaluer-contrat', id]);
  }
}
