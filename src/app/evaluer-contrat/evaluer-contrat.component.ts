import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContratService } from '../../services/contrat.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluer-contrat',
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluer-contrat.component.html',
  styleUrls: ['./evaluer-contrat.component.css'],
})
export class EvaluerContratComponent implements OnInit {
  contratId!: number;
  delais: any[] = [];
  resultatCouleur: string = '';
  evaluationEnvoyee: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private contratService: ContratService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.contratId = Number(this.route.snapshot.paramMap.get('id'));
    this.chargerDelais();
  }

  chargerDelais(): void {
    this.http
      .get<any[]>(`http://localhost:8081/api/delais/contrat/${this.contratId}`)
      .subscribe((data) => {
        this.delais = data.map((d) => ({ ...d, respecte: false }));
      });
  }
getResultatClasse(): string {
  return typeof this.resultatCouleur === 'string'
    ? this.resultatCouleur.toLowerCase()
    : '';
}

envoyerEvaluation(): void {
  console.log('Token JWT envoyé :', localStorage.getItem('token'));

  const listeRespectes = this.delais.map((d) => d.respecte);

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  this.http
    .post<any>( // ✅ on attend un objet JSON et non une string brute
      'http://localhost:8081/api/evaluations/evaluer-delais',
      {
        contratId: this.contratId,
        delaisRespectes: listeRespectes,
      },
      { headers }
    )
    .subscribe({
      next: (response) => {
        console.log('Réponse du backend :', response);
        this.resultatCouleur = response.couleurIndicateur; // ✅ on récupère uniquement la couleur
        this.evaluationEnvoyee = true;
      },
      error: (err) => {
        console.error('Erreur d’envoi évaluation :', err);
        alert('Erreur : accès non autorisé (403)');
      },
    });
}

}
