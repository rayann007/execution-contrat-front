import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ContratService } from '../../../../services/contrat.service';

@Component({
  selector: 'app-contrats-cours',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './contrats-cours.component.html',
  styleUrls: ['./contrats-cours.component.css']
})
export class ContratsCoursComponent implements OnInit {
  totalContratsEnCours: number = 0;

  constructor(private contratService: ContratService) {}

  ngOnInit(): void {
    this.contratService.getNombreContratsActifsAujourdHui().subscribe({
      next: (data) => this.totalContratsEnCours = data,
      error: (err) => console.error('Erreur API contrats actifs', err)
    });
  }
}
