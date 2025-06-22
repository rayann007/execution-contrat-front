import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DocumentService } from '../../services/document.service';
@Component({
  selector: 'app-rapport-contrat',
  imports: [CommonModule, FormsModule],
  templateUrl: './rapport-contrat.component.html',
  styleUrls: ['./rapport-contrat.component.css']
})

  export class RapportContratComponent implements OnInit {
  contratId!: number;
  evaluations: any[] = [];
  pdfBlob!: BlobPart;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.contratId = Number(this.route.snapshot.paramMap.get('id'));
    this.chargerEvaluations();
  }

  chargerEvaluations(): void {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    this.http.get<any[]>(`http://localhost:8081/api/evaluations/contrat/${this.contratId}`, { headers })
      .subscribe({
        next: data => this.evaluations = data,
        error: err => {
          console.error("Erreur lors du chargement des évaluations", err);
          alert("Erreur : accès interdit (403)");
        }
      });
  }

getCouleurHex(couleur: string): string {
  switch (couleur) {
    case 'Vert': return '#4CAF50'; // vert
    case 'Jaune': return '#FFEB3B'; // jaune
    case 'Orange': return '#FF9800'; // orange
    case 'Rouge': return '#F44336'; // rouge
    default: return '#9E9E9E'; // gris si inconnu
  }
}

getHauteur(couleur: string): number {
  // Exemple : chaque couleur a une "importance" visuelle différente
  switch (couleur) {
    case 'Vert': return 80;
    case 'Jaune': return 60;
    case 'Orange': return 40;
    case 'Rouge': return 20;
    default: return 10; // Valeur minimale pour couleur inconnue
  }
}

  telechargerPDF(): void {
    const element = document.getElementById('rapport-evaluation');

    if (!element) {
      alert('Élément de rapport introuvable.');
      return;
    }

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`rapport_contrat_${this.contratId}.pdf`);
    });
  }

ajouterAuxDocuments(): void {
  if (!this.contratId) {
    console.error("❌ contratId manquant");
    return;
  }

  const fileName = `rapport_contrat_${this.contratId}.pdf`;
  const file = new File([this.pdfBlob], fileName, { type: 'application/pdf' });

  const formData = new FormData();
  formData.append('file', file);
  formData.append('contratId', this.contratId.toString());

  console.log("📤 Upload", file.name, "pour contrat ID :", this.contratId);

  const token = localStorage.getItem('token') ?? '';

  this.http.post('http://localhost:8081/api/documents/upload', formData, {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    }),
    responseType: 'text' // ✅ Attendre du texte brut, pas du JSON
  }).subscribe({
    next: response => {
      console.log("✅ Upload réussi :", response);
      alert("Rapport ajouté aux documents attachés !");
    },
    error: err => {
      console.error("❌ Erreur upload rapport :", err);
      alert("Erreur lors de l'ajout du rapport.");
    }
  });
}
}
