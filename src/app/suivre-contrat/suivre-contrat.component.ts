import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContratService } from '../../services/contrat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suivre-contrat',
  standalone: true,
  templateUrl: './suivre-contrat.component.html',
  styleUrls: ['./suivre-contrat.component.css'],
  imports: [
    CommonModule,  // Pour le pipe date
    FormsModule    // Pour [(ngModel)]
  ]
})
export class SuivreContratComponent implements OnInit {
  contrats: any[] = [];

  searchText: string = '';
  selectedType: string = '';
  selectedService: string = '';
  dateDebutFiltre: string = '';
 dateFinFiltre: string = '';

  constructor(private contratService: ContratService, private router: Router) {}

  ngOnInit(): void {
    this.contratService.getAllContrats().subscribe({
      next: data => this.contrats = data,
      error: err => console.error('Erreur chargement contrats', err)
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

    return matchNom && matchType && matchService && dateDebutValide && dateFinValide;
  });
}


  voirDetails(id: number): void {
    this.router.navigate(['/contrat', id]);
  }
}
