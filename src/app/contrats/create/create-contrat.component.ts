import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

// Service
import { ContratService } from '../../../services/contrat.service';

@Component({
  selector: 'app-create-contrat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-contrat.component.html',
  styleUrls: ['./create-contrat.component.css']
})
export class CreateContratComponent implements OnInit {
  contratForm!: FormGroup;
  services = ['RH', 'Finance', 'Logistique', 'IT', 'Batiment'];

  // Événements vers le parent
  @Output() showDelai = new EventEmitter<void>();
  @Output() contratCreated = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    private contratService: ContratService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contratForm = this.fb.group({
      nomContrat: ['', Validators.required],
      type: ['Travaux', Validators.required],
      prestataire: ['', Validators.required],
      serviceConcerne: ['', Validators.required],
      responsableLeoni: ['', Validators.required],
      emailResponsable: ['', [Validators.required, Validators.email]],
      emailsPersonnesDediees: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      statut: 'en_cours'
    });
  }

  // Lors du clic sur le bouton "Ajouter un délai"
  onClickAjouterDelai() {
    this.showDelai.emit();
  }

  // Lors de la soumission du formulaire
  onSubmit(): void {
    if (this.contratForm.valid) {
      this.contratService.createContrat(this.contratForm.value).subscribe({
        next: (response: any) => {
          const createdId = response?.id;
          if (createdId) {
            this.contratCreated.emit(createdId); // ✅ envoie l'id au parent
          }

          this.snackBar.open('✅ Contrat créé avec succès !', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });

          this.router.navigate(['/contrats']);
        },
        error: (err: any) => {
          console.error('❌ Erreur lors de la création du contrat', err);
          this.snackBar.open('❌ Échec de création du contrat', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    } else {
      this.snackBar.open('❗ Formulaire incomplet ou invalide', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-warning']
      });
    }
  }
}
