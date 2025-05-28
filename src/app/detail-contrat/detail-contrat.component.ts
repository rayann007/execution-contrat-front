import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContratService } from '../../services/contrat.service';
import { Contrat } from '../models/contrat.model';
import { MatDialog } from '@angular/material/dialog';
import { DocumentsComponent } from './documents/documents.component';
import { ActionsComponent } from './actions/actions.component';
import { ModifierContratComponent } from './actions/modifier-contrat/modifier-contrat.component';
import { CommonModule } from '@angular/common';
import { ResilierContratComponent } from './actions/resilier-contrat/resilier-contrat.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-contrat',
  standalone: true,
  templateUrl: './detail-contrat.component.html',
  styleUrls: ['./detail-contrat.component.css'],
  imports: [CommonModule, DocumentsComponent, ActionsComponent]
})
export class DetailContratComponent implements OnInit {
  contrat!: Contrat;

  @ViewChild(DocumentsComponent) documentsComponent!: DocumentsComponent;
  archiveMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private contratService: ContratService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // 📌 Détection du mode archive
    this.archiveMode = this.route.snapshot.queryParamMap.get('archive') === 'true';

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contratService.getContratById(+id).subscribe({
        next: (data) => {
          this.contrat = data;
          console.log('✅ Contrat récupéré :', data);
        },
        error: (err) => console.error('❌ Erreur chargement contrat', err)
      });
    }
  }

  onModifier() {
    const dialogRef = this.dialog.open(ModifierContratComponent, {
      disableClose: true,
      width: '600px',
      panelClass: 'dialog-centered',
      data: this.contrat,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contratService.updateContrat(this.contrat.id, result).subscribe({
          next: (updated) => {
            this.contrat = updated;
            console.log('✅ Contrat mis à jour');
          },
          error: (err) => console.error('❌ Erreur maj', err)
        });
      }
    });
  }

  onDocumentAjoute() {
    if (this.documentsComponent) {
      this.documentsComponent.fetchDocuments();
    }
  }

  onGenererRapport() {
    console.log('📊 Générer rapport');
  }

  onResilierContrat() {
    const dialogRef = this.dialog.open(ResilierContratComponent, {
      disableClose: true,
      data: { message: 'Voulez-vous vraiment résilier ce contrat ? Cette action est irréversible.' }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.contratService.resilierContrat(this.contrat.id).subscribe({
          next: (message) => {
            this.contrat.statut = 'résilié';
            this.snackBar.open(message, '✔️', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Erreur : ' + err.error, 'Fermer', { duration: 4000 });
          }
        });
      }
    });
  }
}
