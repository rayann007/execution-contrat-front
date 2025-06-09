import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ChefNavbarComponent } from './dashboard-chef-service/navbar/navbar.component';
import { ChefHeaderComponent } from './dashboard-chef-service/header/header.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavbarComponent, CommonModule,ChefNavbarComponent,ChefHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   constructor(public router: Router) {}

   currentUser = 'user';

   isLoginRoute(): boolean {
   return this.router.url.includes('/login');
  }
  title = 'execution-contrat-front';
}
