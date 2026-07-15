import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  router = inject(Router);
  mostrarNavegacion = false;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.mostrarNavegacion = event.url !== '/login' && event.url !== '/';
    });
  }

  irInicio() {
    this.router.navigate(['/dashboard']);
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }
}