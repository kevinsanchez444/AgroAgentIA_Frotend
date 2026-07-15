import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cultivo } from '../models/cultivo';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  private api = 'http://localhost:8080/api/cultivos';

  constructor(private http: HttpClient) {}

  guardar(cultivo: Cultivo): Observable<Cultivo> {
    return this.http.post<Cultivo>(this.api, cultivo);
  }

  listar(): Observable<Cultivo[]> {
    return this.http.get<unknown>(this.api).pipe(
      map((respuesta) => this.normalizarLista(respuesta))
    );
  }

  private normalizarLista(respuesta: unknown): Cultivo[] {
    const datos = Array.isArray(respuesta)
      ? respuesta
      : (respuesta as any)?.cultivos
        ?? (respuesta as any)?.data
        ?? (respuesta as any)?.content
        ?? [];

    return Array.isArray(datos)
      ? datos.map((item) => this.normalizarCultivo(item))
      : [];
  }

  private normalizarCultivo(item: any): Cultivo {
    return {
      idCultivo: item?.idCultivo ?? item?.id ?? item?.id_cultivo,
      nombreLote: item?.nombreLote ?? item?.nombre_lote ?? item?.lote ?? item?.nombre ?? '',
      municipio: item?.municipio ?? item?.ciudad ?? '',
      departamento: item?.departamento ?? '',
      hectareas: Number(item?.hectareas ?? item?.area ?? 0),
      cantidadArboles: Number(item?.cantidadArboles ?? item?.cantidad_arboles ?? item?.arboles ?? 0),
      fechaSiembra: item?.fechaSiembra ?? item?.fecha_siembra ?? '',
      variedad: item?.variedad ?? '',
      estado: item?.estado ?? ''
    };
  }

}
