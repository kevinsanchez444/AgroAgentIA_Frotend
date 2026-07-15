import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CultivoService } from '../../../services/cultivo.service';
import { Cultivo } from '../../../models/cultivo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-cultivo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar-cultivo.html',
  styleUrl: './registrar-cultivo.css'
})
export class RegistrarCultivo {

  cultivo: Cultivo = {
    nombreLote: '',
    municipio: '',
    departamento: '',
    hectareas: 0,
    cantidadArboles: 0,
    fechaSiembra: '',
    variedad: '',
    estado: ''
  };

  constructor(
  private cultivoService: CultivoService,
  private router: Router
) {}

  guardarCultivo() {

    this.cultivoService.guardar(this.cultivo).subscribe({

      next: () => {

  alert('Cultivo registrado correctamente');

  this.router.navigate(['/dashboard']);

},

      error: (error) => {
        console.error(error);
        alert('Error al registrar el cultivo');
      }

    });

  }

}