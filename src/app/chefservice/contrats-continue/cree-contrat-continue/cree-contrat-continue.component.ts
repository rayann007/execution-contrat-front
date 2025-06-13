import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ContratsContinuService } from '../../../../services/contrats-continu.service';
import { ContratService } from '../../../../services/contrat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cree-contrat-continue',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './cree-contrat-continue.component.html',
  styleUrl: './cree-contrat-continue.component.css',
})
export class CreeContratContinueComponent {
  contratForm!: FormGroup;
  services = ['Nettoyage', 'Gardiennage', 'Restauration'];

  // Événements vers le parent
  @Output() showDelai = new EventEmitter<void>();
  @Output() contratCreated = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    private continuService: ContratsContinuService,
    private contratService: ContratService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contratForm = this.fb.group({
      nomEmploye: ['', Validators.required],
      type: ['gardiennage', Validators.required],
      prestataire: ['', Validators.required],
      serviceConcerne: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
    });
  }

  // Lors du clic sur le bouton "Ajouter un délai"
  onClickAjouterDelai() {
    this.showDelai.emit();
  }

  // Lors de la soumission du formulaire
  onSubmit(): void {
    const contratPayload = {
      nomContrat: this.contratForm.value.nomEmploye, // ✅ correspond à nomContrat attendu par le backend
      type: 'Continu', // ✅ fixe car il s'agit d'un contrat continu
      prestataire: this.contratForm.value.prestataire,
      serviceConcerne: this.contratForm.value.serviceConcerne,
      dateDebut: this.contratForm.value.dateDebut,
      dateFin: this.contratForm.value.dateFin,
      statut: 'en_cours',
      responsableLeoni: 'Ahmed Ghabri', // tu peux aussi les récupérer du form si tu veux les rendre dynamiques
      emailResponsable: 'ahmed.gharbi@gmail.com',
      emailsPersonnesDediees: ''
    };

    this.contratService.createContrat(contratPayload).subscribe({
      next: (createdContrat) => {
        const contratContinuePayload = {
          typeService: this.contratForm.value.type,
          contrat: createdContrat
        };

        this.continuService.create(contratContinuePayload).subscribe({
          next: () => {
            this.snackBar.open('✅ Contrat continu créé avec succès !', 'Fermer', { duration: 3000 });

            // ✅ Événement déclenché pour le parent
            this.contratCreated.emit(createdContrat.id);
            console.log("📤 contratCreated émis :", createdContrat.id);
          },
          error: () => {
            this.snackBar.open('❌ Erreur création contrat continu', 'Fermer', { duration: 3000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('❌ Erreur création contrat principal', 'Fermer', { duration: 3000 });
      }
    });
  }
}
