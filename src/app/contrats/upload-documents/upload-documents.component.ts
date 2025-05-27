import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AjouterDocumentComponent } from '../../detail-contrat/actions/ajouter-document/ajouter-document.component';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UploadDocumentsComponent {
  @Input() contratId!: number;

  constructor(private dialog: MatDialog) {}

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(AjouterDocumentComponent, {
      width: '500px',
      data: { contratId: this.contratId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        console.log('📥 Document ajouté avec succès via UploadDocumentsComponent');
        // Optionnel : ajouter ici un EventEmitter si tu veux notifier le parent
      }
    });
  }
}
