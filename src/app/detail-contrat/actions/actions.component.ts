import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjouterDocumentComponent } from './ajouter-document/ajouter-document.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  @Input() contratId!: number;
  @Output() modifier = new EventEmitter<void>();
  @Output() genererRapport = new EventEmitter<void>();
  @Output() resilierContrat = new EventEmitter<void>();
  @Output() documentAjoute = new EventEmitter<void>(); // 🔁 pour rechargement

  constructor(private dialog: MatDialog) {}

  onAjouterDocument() {
    const dialogRef = this.dialog.open(AjouterDocumentComponent, {
      width: '500px',
      data: { contratId: this.contratId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.documentAjoute.emit(); // ✅ notify parent
      }
    });
  }

  onModifier() {
    this.modifier.emit();
  }

  onGenererRapport() {
    this.genererRapport.emit();
  }

  onResilierContrat() {
    this.resilierContrat.emit();
  }
}
