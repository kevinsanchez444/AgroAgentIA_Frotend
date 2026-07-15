import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SolicitudRecomendacion } from '../models/solicitud-recomendacion';
import { RespuestaRecomendacion } from '../models/respuesta-recomendacion';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  private http = inject(HttpClient);

  private api = 'http://localhost:8080/api/agente';

  generarRecomendacion(
    solicitud: SolicitudRecomendacion
  ): Observable<RespuestaRecomendacion> {

    return this.http.post<RespuestaRecomendacion>(
      `${this.api}/recomendacion`,
      solicitud
    );

  }

}