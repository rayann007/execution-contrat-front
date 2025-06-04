import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Utilisateur {
  id: number;
  email: string;
  nom: string;
  serviceAffectation: string;
  motDePasse: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private baseUrl = 'http://localhost:8081/api/utilisateurs';

  constructor(private http: HttpClient) {}

  // ✅ Ajouter un nouvel utilisateur
  ajouter(utilisateur: Partial<Utilisateur>): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.baseUrl, utilisateur);
  }

  // ✅ Lister tous les utilisateurs
  listerTous(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.baseUrl);
  }

  // ✅ Lister les utilisateurs par rôle (admin / user)
  listerParRole(role: 'admin' | 'user'): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/role/${role}`);
  }

  // ✅ Supprimer un utilisateur
  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ✅ Modifier un utilisateur
  modifier(id: number, utilisateur: Partial<Utilisateur>): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/${id}`, utilisateur);
  }

  // ✅ Réinitialiser le mot de passe
  resetPassword(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/reset-password`, null);
  }
}
