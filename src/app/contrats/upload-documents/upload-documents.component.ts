import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],
  imports: [CommonModule],
})
export class UploadDocumentsComponent {
  uploadedFiles: File[] = [];

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      for (let i = 0; i < target.files.length; i++) {
        this.uploadedFiles.push(target.files[i]);
      }
    }
  }
}
