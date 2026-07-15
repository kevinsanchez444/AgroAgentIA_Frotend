import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgenteService } from '../../services/agente.service';
import { SolicitudRecomendacion } from '../../models/solicitud-recomendacion';

@Component({
  selector: 'app-agentes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './agentes.html',
  styleUrl: './agentes.css'
})
export class AgentesComponent {

  private agenteService = inject(AgenteService);

  solicitud: SolicitudRecomendacion = {
    ciudad: '',
    lote: '',
    hectareas: 0,
    edadCultivo: 0
  };

  recomendacion: string = '';

  cargando = false;

  generarRecomendacion() {

    this.cargando = true;

    this.agenteService
      .generarRecomendacion(this.solicitud)
      .subscribe({

        next: (respuesta) => {

          this.recomendacion = respuesta.recomendacion;

          this.cargando = false;

        },
error: (error) => {

    console.error(error);

    if (error.status === 0) {

      this.recomendacion =
`No fue posible conectar con el servidor.

Verifique que el backend esté ejecutándose.`;

    } else {

      this.recomendacion =
`Ocurrió un error al comunicarse con AgroAgent IA.`;

    }

    this.cargando = false;

}

      });

  }

}