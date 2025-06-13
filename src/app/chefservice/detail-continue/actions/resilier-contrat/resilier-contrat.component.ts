import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-resilier-contrat',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './resilier-contrat.component.html',
  styleUrl: './resilier-contrat.component.css'
})
export class ResilierContratComponent {
constructor(
    public dialogRef: MatDialogRef<ResilierContratComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  confirmer(): void {
    this.dialogRef.close(true);
  }

  annuler(): void {
    this.dialogRef.close(false);
  }
}
