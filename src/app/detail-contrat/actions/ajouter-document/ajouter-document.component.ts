import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentService } from '../../../../services/document.service';

@Component({
  selector: 'app-ajouter-document',
  templateUrl: './ajouter-document.component.html',
  styleUrls: ['./ajouter-document.component.css'],
  standalone: true
})
export class AjouterDocumentComponent {
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
