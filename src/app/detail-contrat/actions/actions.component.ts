import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  @Input() contratId!: number;
  @Output() modifier = new EventEmitter<void>();
  @Output() ajouterDocument = new EventEmitter<void>();
  @Output() genererRapport = new EventEmitter<void>();
  @Output() resilierContrat = new EventEmitter<void>();

  onModifier() {
    this.modifier.emit();
  }

  onAjouterDocument() {
    this.ajouterDocument.emit();
  }

  onGenererRapport() {
    this.genererRapport.emit();
  }

  onResilierContrat() {
    this.resilierContrat.emit();
  }
}
