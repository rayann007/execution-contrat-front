import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrat } from '../../../models/contrat.model';
import { ContratService } from '../../../../services/contrat.service';

@Component({
  selector: 'app-modifier-contrat',
  templateUrl: './modifier-contrat.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./modifier-contrat.component.css'],
})
export class ModifierContratComponent implements OnInit {
  form: FormGroup;
  contratId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private contratService: ContratService
  ) {
    this.form = this.fb.group({
      nomContrat: [''],
      type: [''],
      statut: [''],
      dateDebut: [''],
      dateFin: [''],
      prestataire: [''],
      responsableLeoni: [''],
      emailsPersonnesDediees: ['']
    });
  }

  ngOnInit(): void {
    this.contratId = +this.route.snapshot.paramMap.get('id')!;
    this.contratService.getContratById(this.contratId).subscribe({
      next: (contrat: Contrat) => {
        if (contrat) {
          this.form.patchValue(contrat);
        } else {
          console.warn('Contrat non trouvé');
        }
      },
      error: err => {
        console.error('Erreur lors du chargement du contrat', err);
      }
    });
  }

  valider() {
    if (this.form.valid) {
      this.contratService.updateContrat(this.contratId, this.form.value).subscribe({
        next: () => {
          console.log('Contrat modifié avec succès');
          this.router.navigate(['/contrat', this.contratId]); // Redirection propre
        },
        error: err => {
          console.error('Erreur lors de la modification', err);
        }
      });
    } else {
      console.warn('Formulaire invalide', this.form.value);
    }
  }

  annuler() {
    this.router.navigate(['/contrats',, this.contratId]);
  }
}
