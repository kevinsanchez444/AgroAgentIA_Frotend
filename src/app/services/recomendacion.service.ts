import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recomendacion } from '../models/recomendacion';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {

  private api = 'http://localhost:8080/api/recomendaciones';

  constructor(private http: HttpClient) {}

  listar(): Observable<Recomendacion[]> {
    return this.http.get<unknown>(this.api).pipe(
      map((respuesta) => this.normalizarLista(respuesta))
    );
  }

  private normalizarLista(respuesta: unknown): Recomendacion[] {
    const datos = Array.isArray(respuesta)
      ? respuesta
      : (respuesta as any)?.recomendaciones
        ?? (respuesta as any)?.data
        ?? (respuesta as any)?.content
        ?? [];

    return Array.isArray(datos)
      ? datos.map((item) => ({
          idRecomendacion: item?.idRecomendacion ?? item?.id ?? item?.id_recomendacion ?? 0,
          cultivo: item?.cultivo,
          fecha: item?.fecha ?? item?.createdAt ?? item?.fechaCreacion ?? '',
          recomendacion: item?.recomendacion ?? item?.respuesta ?? item?.mensaje ?? ''
        }))
      : [];
  }

}
