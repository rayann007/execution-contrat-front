import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../../../../../services/document.service';

@Component({
  selector: 'app-ajouter-document',
  templateUrl: './ajouter-document.component.html',
  styleUrls: ['./ajouter-document.component.css']
})
export class AjouterDocumentComponent {
  selectedFiles: File[] = [];
  contratId: number;

  constructor(
    public dialogRef: MatDialogRef<AjouterDocumentComponent>,
    private documentService: DocumentService,
    @Inject(MAT_DIALOG_DATA) public data: { contratId: number }
  ) {
    this.contratId = data.contratId;
    console.log('📌 Contrat ID reçu :', this.contratId);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  onSubmit(): void {
    if (!this.contratId || this.selectedFiles.length === 0) return;

    const uploads = this.selectedFiles.map(file =>
      this.documentService.uploadDocument(this.contratId, file).toPromise()
    );

    Promise.all(uploads)
      .then(() => {
        console.log('✅ Tous les fichiers ont été uploadés');
        this.dialogRef.close(true);
      })
      .catch(err => {
        console.error('❌ Erreur upload :', err);
        this.dialogRef.close(false);
      });
  }
}
