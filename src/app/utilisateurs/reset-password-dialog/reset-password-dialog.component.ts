import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2 style="padding:20px;">Réinitialiser le mot de passe</h2>
    <form [formGroup]="form" (ngSubmit)="valider()" style="display: flex; flex-direction: column; gap: 12px; padding: 20px;">
      <input type="password" formControlName="currentPassword" placeholder="Mot de passe actuel" />
      <input type="password" formControlName="newPassword" placeholder="Nouveau mot de passe" />
      <input type="password" formControlName="confirmPassword" placeholder="Confirmer le mot de passe" />
      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button type="submit">💾 Valider</button>
        <button type="button" (click)="annuler()">Annuler</button>
      </div>
    </form>
  `
})
export class ResetPasswordDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  valider() {
    if (this.form.valid && this.form.value.newPassword === this.form.value.confirmPassword) {
      this.dialogRef.close(this.form.value);
    }
  }

  annuler() {
    this.dialogRef.close();
  }
}
