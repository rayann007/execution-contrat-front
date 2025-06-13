import { Component, OnInit } from '@angular/core';
import { ContratsContinuService } from '../../../services/contrats-continu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-archive-continue',
  imports: [CommonModule, FormsModule],
  templateUrl: './archive-continue.component.html',
  styleUrls: ['./archive-continue.component.css']
})
export class ArchiveContinueComponent implements OnInit {
  contrats: any[] = [];

  searchText: string = '';
  selectedType: string = '';
  selectedService: string = '';

  constructor(private contratService: ContratsContinuService) {}

  ngOnInit(): void {
    this.contratService.getAll().subscribe({
      next: (data) => {
        // ✅ Évite les contrats null et filtre ceux résiliés
        this.contrats = data.filter(c => c.contrat && (c.contrat.statut === 'résilié'|| c.contrat.statut === 'terminé'));
        console.log("✅ Contrats archivés reçus :", this.contrats);
      },
      error: (err) => {
        console.error("❌ Erreur chargement contrats archivés :", err);
      }
    });
  }

  contratsFiltres(): any[] {
    return this.contrats.filter(c => {
      const matchNom = !this.searchText || c.contrat.nomContrat.toLowerCase().includes(this.searchText.toLowerCase());
      const matchType = !this.selectedType || c.typeService === this.selectedType.toLowerCase();
      const matchService = !this.selectedService || c.contrat.serviceConcerne === this.selectedService;
      return matchNom && matchType && matchService;
    });
  }

  voirDetails(id: number): void {
    console.log("🔍 Détails du contrat :", id);
    // Ici tu peux naviguer ou ouvrir un dialog
  }
}
