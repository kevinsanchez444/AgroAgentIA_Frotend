import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string) {

    return this.http.post(this.api + '/login', {
      correo,
      contrasena
    });

  }

  register(nombre: string, correo: string, contrasena: string) {

    return this.http.post(
      this.api + '/register',
      {
        nombre,
        correo,
        contrasena
      },
      {
        responseType: 'text'
      }
    );

  }

}
