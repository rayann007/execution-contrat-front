import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AjouterDocumentComponent } from '../../detail-contrat/actions/ajouter-document/ajouter-document.component';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UploadDocumentsComponent {
  @Input() contratId!: number;

  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<AjouterDocumentComponent>,
    private documentService: DocumentService,
    @Inject(MAT_DIALOG_DATA) public data: { contratId: number }
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
     console.log("✅ test");
    if (!this.selectedFile) return;

    this.documentService.uploadDocument(this.data.contratId, this.selectedFile).subscribe({
      next: () => {
        console.log("✅ Upload terminé");
        this.dialogRef.close(true); // Notifie le parent du succès
      },
      error: (err: any) => {
        console.error('❌ Erreur upload fichier :', err);
        this.dialogRef.close(false); // En cas d'erreur
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
