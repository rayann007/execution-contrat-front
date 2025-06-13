import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ModifierContinueComponent } from './actions/modifier-contrat/modifier-contrat.component';
import { ContratsContinuService, ContratContinue } from '../../../services/contrats-continu.service';
import { DocumentsComponent } from './documents/documents.component';
import { ActionsComponent } from './actions/actions.component';
import { ResilierContratComponent } from './actions/resilier-contrat/resilier-contrat.component';
import { StatutContrat } from '../../models/contrat.model';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-detail-continue',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DocumentsComponent,
    ActionsComponent,
    ModifierContinueComponent,
  ],
  templateUrl: './detail-continue.component.html',
  styleUrls: ['./detail-continue.component.css']
})
export class DetailContinueComponent implements OnInit {
  contrat!: ContratContinue;
  idContrat!: number;
  archiveMode: boolean = false;

  @ViewChild(DocumentsComponent) documentsComponent!: DocumentsComponent;

  constructor(
    private route: ActivatedRoute,
    private contratService: ContratsContinuService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.archiveMode = this.route.snapshot.queryParamMap.get('archive') === 'true';

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idContrat = +id;
      this.contratService.getById(this.idContrat).subscribe({
        next: (data) => {
          this.contrat = data;
          console.log('✅ Contrat récupéré :', data);
        },
        error: (err) => console.error('❌ Erreur chargement contrat', err),
      });
    }
  }

isEditing = false;

onModifier(): void {
  this.isEditing = true;
}

onContratModifie(): void {
  this.isEditing = false;
  this.ngOnInit(); // Recharge les données
}



  onResilierContrat() {
    const dialogRef = this.dialog.open(ResilierContratComponent, {
      disableClose: true,
      data: {
        message: 'Voulez-vous vraiment résilier ce contrat ? Cette action est irréversible.',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed && this.idContrat) {
        this.contratService.resilierContrat(this.idContrat).subscribe({
          next: (message) => {
            if (this.contrat?.contrat) {
              this.contrat.contrat.statut = StatutContrat.Résilié;
            }
            this.snackBar.open(message, '✔️', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Erreur : ' + err.error, 'Fermer', {
              duration: 4000,
            });
          }
        });
      }
    });
  }
}
