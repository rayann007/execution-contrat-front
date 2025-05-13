import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-echeances-mois',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './echeances-mois.component.html',
  styleUrls: ['./echeances-mois.component.css']
})
export class EcheancesMoisComponent implements OnInit {
  echeances: { date: string; label: string; icon: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any[]>('http://localhost:8081/api/contrats/echeances-mois', { headers }).subscribe({
      next: (data) => {
        this.echeances = data.map(c => ({
          date: c.dateFin,
          label: c.nomContrat,
          icon: 'event' // ou autre logique si tu veux varier
        }));
      },
      error: err => console.error('Erreur chargement échéances', err)
    });
  }
}
