import { Component } from '@angular/core';
import { ContratsContinuService } from '../../../../services/contrats-continu.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contrats-nettoyage',
  imports: [MatCardModule],
  templateUrl: './contrats-nettoyage.component.html',
  styleUrl: './contrats-nettoyage.component.css'
})
export class ContratsNettoyageComponent {
  totalNettoyageEnCours: number = 0;

  constructor(private contratService: ContratsContinuService) {}

  ngOnInit(): void {
    this.contratService.getByType('nettoyage').subscribe({
      next: (data) => this.totalNettoyageEnCours = data.length,
      error: (err) => console.error('Erreur API contrats actifs', err)
    });
  }
}
