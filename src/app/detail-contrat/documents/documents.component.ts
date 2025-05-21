import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input() contratId!: number;
  documents: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.contratId) {
      this.fetchDocuments();
    }
  }

  fetchDocuments(): void {
    this.http.get<any[]>(`http://localhost:8081/api/documents/by-contrat/${this.contratId}`)
      .subscribe({
        next: (docs) => this.documents = docs,
        error: (err) => console.error('❌ Erreur chargement documents', err)
      });
  }

  downloadDocument(id: number): void {
    window.open(`http://localhost:8081/api/documents/download/${id}`, '_blank');
  }

  deleteDocument(id: number): void {
    if (confirm('Supprimer ce document ?')) {
      this.http.delete(`http://localhost:8081/api/documents/${id}`).subscribe(() => {
        this.documents = this.documents.filter(doc => doc.id !== id);
      });
    }
  }

  renameDocument(id: number): void {
    const newName = prompt('Nouveau nom du fichier :');
    if (newName) {
      this.http.put(`http://localhost:8081/api/documents/${id}/rename?newName=${encodeURIComponent(newName)}`, null)
        .subscribe(() => this.fetchDocuments());
    }
  }

  downloadAllAsZip(): void {
    window.open(`http://localhost:8081/api/documents/zip-by-contrat/${this.contratId}`, '_blank');
  }
}
