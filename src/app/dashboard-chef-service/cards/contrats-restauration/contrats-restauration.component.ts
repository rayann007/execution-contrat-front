import { Component } from '@angular/core';
import { ContratsContinuService } from '../../../../services/contrats-continu.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contrats-restauration',
  imports: [MatCardModule],
  templateUrl: './contrats-restauration.component.html',
  styleUrl: './contrats-restauration.component.css'
})
export class ContratsRestaurationComponent {
totalRestauEnCours: number = 0;

  constructor(private contratService: ContratsContinuService) {}

  ngOnInit(): void {
    this.contratService.getByType('restauration').subscribe({
      next: (data) => this.totalRestauEnCours = data.length,
      error: (err) => console.error('Erreur API contrats actifs', err)
    });
  }
}
