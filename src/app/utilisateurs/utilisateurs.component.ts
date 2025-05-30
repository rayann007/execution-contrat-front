import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Utilisateur {
  id: number;
  email: string;
  nom: string;
  serviceAffectation: string;
  role: 'admin' | 'user';
}

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css'],
  standalone: true,
   imports: [CommonModule, FormsModule],
})
export class UtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  baseUrl = 'http://localhost:8081/api/utilisateurs';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<Utilisateur[]>(this.baseUrl).subscribe({
      next: data => this.utilisateurs = data,
      error: err => console.error('Erreur chargement utilisateurs', err)
    });
  }

  updateUser(user: Utilisateur) {
    this.http.put(`${this.baseUrl}/${user.id}`, user).subscribe({
      next: () => alert('✅ Utilisateur mis à jour'),
      error: () => alert('❌ Erreur lors de la mise à jour')
    });
  }

  deleteUser(id: number) {
    if (confirm('❗ Supprimer cet utilisateur ?')) {
      this.http.delete(`${this.baseUrl}/${id}`).subscribe({
        next: () => {
          this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
          alert('✅ Utilisateur supprimé');
        },
        error: () => alert('❌ Erreur suppression')
      });
    }
  }

  resetPassword(id: number) {
    if (confirm('Réinitialiser le mot de passe ?')) {
      this.http.put(`${this.baseUrl}/${id}/reset-password`, null).subscribe({
        next: () => alert('🔒 Mot de passe réinitialisé'),
        error: () => alert('❌ Erreur réinitialisation')
      });
    }
  }
}
