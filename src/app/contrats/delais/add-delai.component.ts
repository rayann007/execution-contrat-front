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
  @Input() contratId!: number;

  date = '';
  joursRetard = 0;
  montantPenaliteJournalier = 0;
  commentaire = '';
  respecteDelai = true;
  penalitePayee = true;

  constructor(private delaiService: DelaiContractuelService) {}

  enregistrer() {
    const delai = {
      date: this.date,
      joursRetard: this.joursRetard,
      montantPenaliteJournalier: this.montantPenaliteJournalier,
      commentaire: this.commentaire,
      respecteDelai: this.respecteDelai,
      penalitePayee: this.penalitePayee,
      contrat_id: this.contratId // ✅ ici garanti bon
    };

    this.delaiService.ajouterDelai(delai).subscribe({
      next: res => {
        console.log('✅ Délai enregistré :', res);
        alert('Délai ajouté avec succès !');
      },
      error: err => {
        console.error('❌ Erreur lors de l\'ajout', err);
        alert('Erreur lors de l\'ajout');
      }
    });
  }
}
