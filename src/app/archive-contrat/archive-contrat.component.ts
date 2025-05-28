import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContratService } from '../../services/contrat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-archive-contrat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './archive-contrat.component.html',
  styleUrls: ['./archive-contrat.component.css']
})
export class ArchiveContratComponent implements OnInit {
  contrats: any[] = [];
  searchText = '';
  selectedType = '';
  selectedService = '';

  constructor(private contratService: ContratService, private router: Router) {}

  ngOnInit(): void {
    this.contratService.getAllContrats().subscribe({
      next: data => {
        this.contrats = data.filter(c => c.statut === 'terminé' || c.statut === 'résilié');
      },
      error: err => console.error('Erreur chargement contrats archivés', err)
    });
  }

  contratsFiltres() {
    return this.contrats.filter(c => {
      const matchNom = !this.searchText || c.nomContrat?.toLowerCase().includes(this.searchText.toLowerCase());
      const matchType = !this.selectedType || c.type === this.selectedType;
      const matchService = !this.selectedService || c.serviceConcerne === this.selectedService;
      return matchNom && matchType && matchService;
    });
  }

  voirDetails(id: number): void {
    this.router.navigate(['/contrat', id], { queryParams: { archive: 'true' } });
  }
}
