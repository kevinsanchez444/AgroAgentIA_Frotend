import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  correo = '';
  contrasena = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion() {

    this.authService.login(this.correo, this.contrasena)
      .subscribe({

        next: (respuesta) => {

          console.log(respuesta);

          alert('Inicio de sesión exitoso');

          this.router.navigate(['/dashboard']);

        },

        error: (error) => {

          console.log(error);

          alert('Correo o contraseña incorrectos');

        }

      });

  }

}