import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-documents',
  imports: [CommonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
 @Input() contratId!: number;
  documents: any[] = [];

  constructor(private http: HttpClient , private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Facultatif : au premier chargement
    if (this.contratId) this.fetchDocuments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contratId'] && this.contratId) {
      this.fetchDocuments();
    }
  }

  fetchDocuments(): void {
    if (!this.contratId) {
      console.warn('⚠️ contratId manquant pour charger les documents');
      return;
    }

    this.http.get<any[]>(`http://localhost:8081/api/documents/by-contrat/${this.contratId}`).subscribe({
      next: (docs) => {
        this.documents = [...docs];
        console.log('📄 Documents liés rechargés :', docs);
      },
      error: (err) => {
        console.error('❌ Erreur chargement documents', err);
      }
    });
  }

downloadDocument(id: number): void {
  const token = localStorage.getItem('token') ?? '';

  this.http.get(`http://localhost:8081/api/documents/download/${id}`, {
    responseType: 'blob',
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document_${id}`; // 👈 tu peux améliorer avec le vrai nom plus tard
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.error("❌ Erreur téléchargement", err);
    }
  });
}


deleteDocument(id: number): void {
  if (confirm('❗ Voulez-vous vraiment supprimer ce document ?')) {
    this.http.delete(`http://localhost:8081/api/documents/${id}`, { responseType: 'text' }).subscribe({
      next: () => {
        this.documents = this.documents.filter(doc => doc.id !== id);
        this.snackBar.open('📁 Document supprimé avec succès', 'Fermer', { duration: 3000 });
      },
      error: (err) => {
        if (err.status === 409) {
          this.snackBar.open('❌ Ce document est archivé et ne peut pas être supprimé.', 'Fermer', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        } else {
          this.snackBar.open('❌ Erreur lors de la suppression', 'Fermer', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      }
    });
  }
}





  renameDocument(id: number): void {
    const newName = prompt('Nouveau nom du fichier :');
    if (newName) {
      this.http.put(
        `http://localhost:8081/api/documents/${id}/rename?newName=${encodeURIComponent(newName)}`,
        null
      ).subscribe(() => this.fetchDocuments());
    }
  }

downloadAllAsZip(): void {
  const url = `http://localhost:8081/api/documents/zip-by-contrat/${this.contratId}`;
  const headers = {
    responseType: 'blob' as 'json',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    }
  };

  this.http.get<Blob>(url, headers).subscribe({
    next: (blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `documents_contrat_${this.contratId}.zip`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    },
    error: (err) => {
      console.error('❌ Erreur lors du téléchargement ZIP :', err);
    }
  });
}
}
