import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../../../../services/document.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-uplod-documents',
  imports: [CommonModule],
  templateUrl: './uplod-documents.component.html',
  styleUrls: ['./uplod-documents.component.css']
})
export class UplodDocumentsComponent {
  selectedFiles: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<UplodDocumentsComponent>,
    private documentService: DocumentService,
    @Inject(MAT_DIALOG_DATA) public data: { contratId: number }
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      console.log("📁 Fichiers sélectionnés :", this.selectedFiles);
    }
  }

  onSubmit(): void {
    if (!this.data?.contratId) {
      console.error("❌ contratId manquant");
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    this.selectedFiles.forEach(file => {
      this.documentService.uploadDocument(this.data.contratId, file).subscribe({
        next: () => {
          successCount++;
          console.log("✅ Upload de", file.name);
          if (successCount + errorCount === this.selectedFiles.length) {
            this.dialogRef.close(true);
          }
        },
        error: (err) => {
          errorCount++;
          console.error("❌ Échec de", file.name, err);
          if (successCount + errorCount === this.selectedFiles.length) {
            this.dialogRef.close(false);
          }
        }
      });
    });
  }
}
