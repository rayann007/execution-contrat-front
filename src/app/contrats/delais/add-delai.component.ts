import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-delai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-delai.component.html',
  styleUrls: ['./add-delai.component.css']
})
export class AddDelaiComponent {
  delai = {
    date: '',
    joursRetard: 0,
    montantPenaliteJournalier: 0,
    commentaire: '',
    respecteDelai: false,
    penalitePayee: false
  };

  enregistrer() {
    console.log('Délai enregistré :', this.delai);
    // Tu pourras envoyer ça via un service HTTP
  }
}
