import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DelaiContractuelService } from '../../../services/delai-contractuel.service';

@Component({
  selector: 'app-add-delai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-delai.component.html',
  styleUrls: ['./add-delai.component.css']
})
export class AddDelaiComponent {
  @Input() contratId!: number; // ✅ Reçoit l’ID depuis le parent

  constructor(private delaiService: DelaiContractuelService) {}

  delai = {
    date: '',
    joursRetard: 0,
    montantPenaliteJournalier: 0,
    commentaire: '',
    respecteDelai: true,
    penalitePayee: true,
    contrat_id: 0             // ✅ Propriété ajoutée ici
  };

  enregistrer() {
    this.delai.contrat_id = this.contratId;

    this.delaiService.ajouterDelai(this.delai).subscribe({
      next: res => {
        console.log('✅ Délai enregistré :', res);
        alert('Délai ajouté avec succès !');
      },
      error: err => {
        console.error('❌ Erreur lors de l\'enregistrement du délai', err);
        alert('Erreur lors de l\'ajout');
      }
    });
  }
}
