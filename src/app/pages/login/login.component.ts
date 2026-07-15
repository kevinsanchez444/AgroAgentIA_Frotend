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

  modoRegistro = false;

  nombre = '';
  correo = '';
  contrasena = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion() {

    this.authService
      .login(this.correo, this.contrasena)
      .subscribe({

        next: () => {

          alert('Inicio de sesión exitoso');

          this.router.navigate(['/dashboard']);

        },

        error: () => {

          alert('Correo o contraseña incorrectos');

        }

      });

  }

  registrar() {

    this.authService
      .register(
        this.nombre,
        this.correo,
        this.contrasena
      )
      .subscribe({

        next: () => {

          // Después del registro inicia sesión automáticamente
          this.authService
            .login(this.correo, this.contrasena)
            .subscribe({

              next: () => {

                alert('Usuario registrado correctamente');

                this.router.navigate(['/dashboard']);

              },

              error: () => {

                alert('Usuario registrado, pero no fue posible iniciar sesión automáticamente.');

                // Si falla el login automático, vuelve al formulario de login
                this.modoRegistro = false;

              }

            });

        },

        error: (err) => {

          if (err.error) {

            alert(err.error);

          } else {

            alert('No fue posible registrar el usuario');

          }

        }

      });

  }

}