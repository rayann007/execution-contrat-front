import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CreateContratComponent } from './create/create-contrat.component';
import { AddDelaiComponent } from './delais/add-delai.component';
import { UploadDocumentsComponent } from "./upload-documents/upload-documents.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contrats',
  standalone: true,
  imports: [CommonModule, CreateContratComponent, AddDelaiComponent, UploadDocumentsComponent],
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent {
  contratId: number | undefined ;
  constructor(private dialog: MatDialog) {}
  isDelaiVisible = false;


    toggleDelai() {
    this.isDelaiVisible = true;
  }

    openUploadDialog(): void {
    this.dialog.open(UploadDocumentsComponent, {
      width: '600px',
      data: {
      contratId: this.contratId  // ✅ Pass the contratId here
    }
    });
  }
  handleContratCreated(id: number) {
  this.contratId = id;
}
}
