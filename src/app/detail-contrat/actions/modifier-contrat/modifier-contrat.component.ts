import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Contrat } from '../../../models/contrat.model';


@Component({
  selector: 'app-modifier-contrat',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './modifier-contrat.component.html',
   styleUrls: ['./modifier-contrat.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModifierContratComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModifierContratComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contrat,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nomContrat: [data.nomContrat],
      type: [data.type],
      statut: [data.statut],
      dateDebut: [data.dateDebut],
      dateFin: [data.dateFin],
      prestataire: [data.prestataire],
      responsableLeoni: [data.responsableLeoni],
      emailsPersonnesDediees: [data.emailsPersonnesDediees]
    });
  }

  valider() {
    this.dialogRef.close(this.form.value);
    
  }

  annuler() {
    this.dialogRef.close();
  }
}
