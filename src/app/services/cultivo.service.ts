import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<Cultivo[]>(this.api);
  }

}