import { Component, OnInit } from '@angular/core';
import { ContratsContinuService } from '../../../services/contrats-continu.service';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor, etc.
@Component({
  selector: 'app-echeance',
  imports: [MatIconModule,CommonModule], // Import MatIconModule for Material icons
  templateUrl: './echeance.component.html',
  styleUrls: ['./echeance.component.css'] // Plural: styleUrls (Angular convention)
})
export class EcheanceComponent implements OnInit {
  echeances: { date: string; label: string; icon: string }[] = [];
aucunContrat: boolean = false;

  constructor(private contratService: ContratsContinuService) {}

ngOnInit(): void {
  this.contratService.getContratsContinusEcheanceMois().subscribe({
    next: (data) => {
      if (data.length === 0) {
        this.aucunContrat = true;
        this.echeances = [];
      } else {
        this.aucunContrat = false;
        this.echeances = data.map(c => ({
          date: c.dateFin,
          label: c.nomContrat,
          icon: 'event'
        }));
      }
    },
    error: err => {
      console.error('Erreur chargement échéances', err);
    }
  });
}

}
