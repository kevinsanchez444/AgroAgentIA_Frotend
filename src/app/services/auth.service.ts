import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private url = 'http://localhost:8080/api/auth';

  login(correo: string, contrasena: string) {

    return this.http.post(
      `${this.url}/login`,
      {
        correo,
        contrasena
      }
    );

  }

}
