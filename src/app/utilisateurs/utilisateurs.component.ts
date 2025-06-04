import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisateurService, Utilisateur } from '../../services/utilisateur.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule],
})
export class UtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  utilisateursOriginal: Utilisateur[] = [];

  ligneModifiee: { [id: number]: boolean } = {};
  ligneEnregistree: { [id: number]: boolean } = {};

  nouvelUtilisateur: Partial<Utilisateur> = {
    email: '',
    nom: '',
    serviceAffectation: '',
    motDePasse: '',
    role: 'user'
  };

  ajoutEnCours = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.utilisateurService.listerTous().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.utilisateursOriginal = JSON.parse(JSON.stringify(data));
      },
      error: (err) => console.error('Erreur chargement utilisateurs', err),
    });
  }

  ajouterUtilisateur(): void {
    if (!this.nouvelUtilisateur.email || !this.nouvelUtilisateur.nom || !this.nouvelUtilisateur.motDePasse) {
      this.snackBar.open('Veuillez remplir tous les champs requis.', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.ajoutEnCours = true;

    this.utilisateurService.ajouter(this.nouvelUtilisateur).subscribe({
      next: (utilisateurAjoute) => {
        this.utilisateurs.push(utilisateurAjoute);
        this.utilisateursOriginal.push({ ...utilisateurAjoute });
        this.nouvelUtilisateur = {
          email: '',
          nom: '',
          serviceAffectation: '',
          motDePasse: '',
          role: 'user'
        };
        this.snackBar.open('✅ Utilisateur ajouté avec succès', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.ajoutEnCours = false;
      },
      error: (err) => {
        console.error('Erreur ajout utilisateur', err);
        this.snackBar.open('❌ Erreur lors de l’ajout', 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.ajoutEnCours = false;
      }
    });
  }

  isModified(user: Utilisateur): boolean {
    const original = this.utilisateursOriginal.find(u => u.id === user.id);
    if (!original) return false;
    return (
      user.email !== original.email ||
      user.nom !== original.nom ||
      user.serviceAffectation !== original.serviceAffectation ||
      user.role !== original.role
    );
  }

  updateUser(user: Utilisateur): void {
    if (!this.isModified(user)) return;

    this.utilisateurService.modifier(user.id, user).subscribe({
      next: () => {
        const index = this.utilisateursOriginal.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.utilisateursOriginal[index] = { ...user };
        }

        this.snackBar.open('✅ Utilisateur modifié avec succès', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        this.ligneEnregistree[user.id] = true;
        setTimeout(() => this.ligneEnregistree[user.id] = false, 2000);
      },
      error: (err) => {
        console.error('Erreur modification', err);
        this.snackBar.open('❌ Erreur lors de la modification', 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Supprimer cet utilisateur ?')) {
      this.utilisateurService.supprimer(id).subscribe({
        next: () => {
          this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
          this.utilisateursOriginal = this.utilisateursOriginal.filter(u => u.id !== id);
          console.log('Utilisateur supprimé');
        },
        error: (err) => console.error('Erreur suppression', err),
      });
    }
  }

resetPassword(userId: number): void {
  const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
    width: '400px',
    data: { userId }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.utilisateurService.resetPassword(userId).subscribe({
        next: () => {
          this.snackBar.open('✅ Mot de passe réinitialisé', 'OK', { duration: 3000, panelClass: ['snackbar-success'] });
        },
        error: (err) => {
          console.error('Erreur reset', err);
          this.snackBar.open('❌ Erreur lors de la réinitialisation', 'Fermer', { duration: 3000, panelClass: ['snackbar-error'] });
        }
      });
    }
  });
}
}
