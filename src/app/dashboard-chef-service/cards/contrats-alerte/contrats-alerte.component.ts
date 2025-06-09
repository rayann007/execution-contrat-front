import { Component } from '@angular/core';
import { ContratService } from '../../../../services/contrat.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'chef-app-contrats-alerte',
  imports: [MatCardModule],
  templateUrl: './contrats-alerte.component.html',
  styleUrl: './contrats-alerte.component.css'
})
export class ContratsAlerteComponent {
countContratsContinusEnAlerte = 0;

  constructor(private contratService: ContratService) {}

  ngOnInit(): void {
this.contratService.countContratsContinusEnAlerte().subscribe({
  next: (count) => {
    this.countContratsContinusEnAlerte = count;
  },
  error: (err) => {
    console.error('Erreur récupération du nombre de contrats continus en alerte', err);
  }
});
  }
}
