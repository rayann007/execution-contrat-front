import { Component } from '@angular/core';
import { ContratsContinuService } from '../../../../services/contrats-continu.service';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-contrats-gardiennage',
  imports: [MatCardModule],
  templateUrl: './contrats-gardiennage.component.html',
  styleUrl: './contrats-gardiennage.component.css'
})
export class ContratsGardiennageComponent {
totalGardiennageEnCours: number = 0;

  constructor(private contratService: ContratsContinuService) {}

  ngOnInit(): void {
    this.contratService.getByType('gardiennage').subscribe({
      next: (data) => this.totalGardiennageEnCours = data.length,
      error: (err) => console.error('Erreur API contrats actifs', err)
    });
  }
}
