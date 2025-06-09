import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chef-app-header',
  imports: [MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class ChefHeaderComponent {
userName = localStorage.getItem('userName') || 'Ahmed Ghabri';
  userService = localStorage.getItem('userService') || 'Chef Service Nettoyage et Gardinage';

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
