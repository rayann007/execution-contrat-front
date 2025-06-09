import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chef-app-navbar',
  imports: [RouterModule, MatIconModule, MatListModule, MatSidenavModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class ChefNavbarComponent {

}
