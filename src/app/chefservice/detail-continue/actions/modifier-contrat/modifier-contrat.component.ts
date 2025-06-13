import { Contrat } from './../../../../models/contrat.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratsContinuService } from '../../../../../services/contrats-continu.service';
import { ContratService } from '../../../../../services/contrat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modifier-contrat',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modifier-contrat.component.html',
  styleUrls: ['./modifier-contrat.component.css']
})
export class ModifierContinueComponent implements OnInit {
  form!: FormGroup;
  contratId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contratService: ContratService,
    private contratContinuService: ContratsContinuService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

ngOnInit(): void {
  this.contratId = Number(this.route.snapshot.paramMap.get('id'));

  if (!this.contratId) {
    this.snackBar.open('❌ ID de contrat invalide', 'Fermer', { duration: 3000 });
    this.router.navigate(['/contrats']);
    return;
  }

  this.contratService.getContratById(this.contratId).subscribe({
    next: (contrat) => {
      const formatDate = (d: string | null) =>
        d ? new Date(d).toISOString().split('T')[0] : '';

      this.form = this.fb.group({
        nomContrat: [contrat.nomContrat || '', Validators.required],
        prestataire: [contrat.prestataire || '', Validators.required],
        serviceConcerne: [contrat.serviceConcerne || '', Validators.required],
        dateDebut: [formatDate(contrat.dateDebut), Validators.required],
        dateFin: [formatDate(contrat.dateFin), Validators.required],
         statut: [contrat.statut || '', Validators.required]
      });
    },
    error: () => {
      this.snackBar.open('❌ Erreur chargement du contrat', 'Fermer', { duration: 3000 });
      this.router.navigate(['/contrats']);
    }
  });
}


onSubmit(): void {
  if (this.form.invalid) return;

  const updatedContrat = {
    ...this.form.value,
    dateDebut: new Date(this.form.value.dateDebut),
    dateFin: new Date(this.form.value.dateFin)
  };

  this.contratService.updateContrat(this.contratId, updatedContrat).subscribe({
    next: () => {
      // 💡 On récupère maintenant le contrat continu associé
      this.contratContinuService.getAll().subscribe({
        next: (allContinus) => {
          const contratContinu = allContinus.find(c => c.contrat?.id === this.contratId);

          if (contratContinu) {
            this.snackBar.open('✅ Contrat modifié avec succès', 'Fermer', { duration: 3000 });
            this.router.navigate(['/contrat-continue', contratContinu.id]);
          } else {
            this.snackBar.open('⚠️ Contrat continu non trouvé', 'Fermer', { duration: 3000 });
          }
        },
        error: () => {
          this.snackBar.open('❌ Erreur recherche contrat continu', 'Fermer', { duration: 3000 });
        }
      });
    },
    error: () => {
      this.snackBar.open('❌ Erreur modification', 'Fermer', { duration: 3000 });
    }
  });
}

}
