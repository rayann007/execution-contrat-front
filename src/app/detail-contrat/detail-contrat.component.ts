import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContratService } from '../../services/contrat.service';
import { Contrat } from '../models/contrat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-contrat',
  templateUrl: './detail-contrat.component.html',
  styleUrls: ['./detail-contrat.component.css'],
  imports: [CommonModule],
  standalone: true, 
})
export class DetailContratComponent implements OnInit {
  contrat!: Contrat;

  constructor(
    private contratService: ContratService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contratService.getContratById(+id).subscribe({
        next: (data) => {
          this.contrat = data;
          console.log('✅ Contrat récupéré :', data);
        },
        error: (err) => console.error('❌ Erreur chargement contrat', err)
      });
    }
  }
}
