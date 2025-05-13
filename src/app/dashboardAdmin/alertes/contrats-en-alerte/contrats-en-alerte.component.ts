import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratService } from '../../../../services/contrat.service';

@Component({
  selector: 'app-contrats-en-alerte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contrats-en-alerte.component.html',
  styleUrls: ['./contrats-en-alerte.component.css']
})
export class ContratsEnAlerteComponent implements OnInit {
  contratsEnAlerte: any[] = [];

  constructor(private contratService: ContratService) {}

  ngOnInit(): void {
    this.contratService.getContratsEnAlerte().subscribe({
      next: (data) => {
        this.contratsEnAlerte = data;
      },
      error: (err) => console.error('Erreur lors du chargement des contrats en alerte', err)
    });
  }
}
