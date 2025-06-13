import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjouterDocumentComponent } from '../../../detail-contrat/actions/ajouter-document/ajouter-document.component';
import { ModifierContinueComponent } from './modifier-contrat/modifier-contrat.component';
import { ContratContinue } from '../../../../services/contrats-continu.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  @Input() contratId!: number;
  @Output() documentAjoute = new EventEmitter<void>();
  @Output() resilierContrat = new EventEmitter<void>();
  @Output() modifier = new EventEmitter<void>();

    @Input() detailContrat!: ContratContinue; // utilisé pour modification
  router: Router = new Router;
  constructor(private dialog: MatDialog) {}

  onAjouterDocument(): void {
    const dialogRef = this.dialog.open(AjouterDocumentComponent, {
      data: { contratId: this.contratId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.documentAjoute.emit();
      }
    });
  }

  onResilierContrat(): void {
    this.resilierContrat.emit();
  }
  onModifier() {
    console.log('Modifier contrat avec ID:', this.contratId);
    this.router.navigate(['/modifier-continue', this.contratId]);
  }


  onGenererRapport(): void {
    // implémentation future
  }
}
