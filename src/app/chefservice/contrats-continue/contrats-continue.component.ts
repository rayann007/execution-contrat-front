import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDocumentsComponent } from '../../contrats/upload-documents/upload-documents.component';
import {CreeContratContinueComponent} from './cree-contrat-continue/cree-contrat-continue.component';
@Component({
  selector: 'app-contrats-continue',
  imports: [CreeContratContinueComponent],
  templateUrl: './contrats-continue.component.html',
  styleUrls: ['./contrats-continue.component.css']
})
export class ContratsContinueComponent {
  contratId: number | undefined;

  constructor(private dialog: MatDialog) {}

  handleContratCreated(id: number) {
    this.contratId = id;

    this.dialog.open(UploadDocumentsComponent, {
      width: '600px',
      data: { contratId: id }  // ✅ ID bien transmis
    });
  }
}
