import { Component } from '@angular/core';
import { ContratService } from '../../../services/contrat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contrat-en-alerte',
  imports: [CommonModule],
  templateUrl: './contrat-en-alerte.component.html',
  styleUrl: './contrat-en-alerte.component.css'
})
export class ContratEnAlerteComponent {
  contratsEnAlerte: any[] = [];

  constructor(private contratService: ContratService) {}

  ngOnInit(): void {
    this.contratService.getContratsContinusEnAlerte().subscribe({
      next: (data) => {
        this.contratsEnAlerte = data;
      },
      error: (err) => console.error('Erreur lors du chargement des contrats en alerte', err)
    });
  }
}
