import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ContratService } from '../../../../services/contrat.service';


@Component({
  selector: 'app-contrats-alerte',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './contrats-alerte.component.html',
  styleUrls: ['./contrats-alerte.component.css']
})
export class ContratsAlerteComponent implements OnInit {
  totalContratsAlerte = 0;

  constructor(private contratService: ContratService) {}

  ngOnInit(): void {
    this.contratService.getNombreContratsEnAlerte().subscribe({
      next: (data: number) => this.totalContratsAlerte = data,
      error: (err: any) => console.error('Erreur API contrats alerte', err)
    });
  }
}

