import { Component, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatButtonModule

  ],
  templateUrl: './create-contrat.component.html',
  styleUrls: ['./create-contrat.component.css']
})
export class CreateContratComponent implements OnInit {
  contratForm!: FormGroup;
  services = ['RH', 'Finance', 'Logistique', 'IT' , 'Batiment'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contratForm = this.fb.group({
      reference: [''],
      nomContrat: [''],
      type: ['Travaux'],
      prestataire: [''],
      serviceConcerne: [''],
      responsableLeoni: [''],
      emailResponsable: [''],
      emailsPersonnesDediees: [''],
      dateDebut: [''],
      dateFin: ['']
    });
  }

  onSubmit(): void {
    console.log(this.contratForm.value);
    // ici tu appelles ton service pour enregistrer en base
  }
}
