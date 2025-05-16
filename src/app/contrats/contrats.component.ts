import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CreateContratComponent } from './create/create-contrat.component';
import { AddDelaiComponent } from './delais/add-delai.component';
import { UploadDocumentsComponent } from "./upload-documents/upload-documents.component";

@Component({
  selector: 'app-contrats',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CreateContratComponent, AddDelaiComponent, UploadDocumentsComponent],
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent {}
