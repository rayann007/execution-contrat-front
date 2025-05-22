import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContratService } from '../../services/contrat.service';
import { Contrat } from '../models/contrat.model';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents/documents.component';
import { ActionsComponent } from './actions/actions.component';
import { MatDialog } from '@angular/material/dialog';
import { ModifierContratComponent } from './actions/modifier-contrat/modifier-contrat.component';




@Component({
  selector: 'app-detail-contrat',
  standalone: true,
  templateUrl: './detail-contrat.component.html',
  styleUrls: ['./detail-contrat.component.css'],
  imports: [CommonModule, DocumentsComponent, ActionsComponent]
})
export class DetailContratComponent implements OnInit {
  contrat!: Contrat;

  constructor(
    private route: ActivatedRoute,
    private contratService: ContratService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
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

  // 🔧 Méthodes actions (à connecter à <app-actions>)
onModifier() {
  const dialogRef = this.dialog.open(ModifierContratComponent, {
    disableClose: true,
    width: '600px',
    panelClass: 'dialog-centered', 
    data: this.contrat, // on passe le contrat actuel au composant
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



  onAjouterDocument() {
    console.log('📎 Ajouter document');
    // Ouvre une modale d’upload
  }

  onGenererRapport() {
    console.log('📊 Générer rapport');
    // Appel backend génération de PDF
  }

  onResilierContrat() {
    console.log('❌ Résilier le contrat');
    // Appel API pour mise à jour du statut
  }
}
