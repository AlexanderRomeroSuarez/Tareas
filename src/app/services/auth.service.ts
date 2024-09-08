import { Injectable, inject } from '@angular/core';
import { AuthCredenciales } from '../auth.enum';
import { HttpClient } from '@angular/common/http';
import { IRequestLogin, IResponseLogin } from './user-api-interface';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environments';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient = inject(HttpClient);
  _jwtHelper = inject(JwtHelperService);

  URL_USER = environment.host + '/Loguin';
  URL_LOGIN = this.URL_USER + '/login';

  //private isAuthenticated = false;
  //private currentUser: string | null = null;

  /*login(username: string, password: string): boolean {
    if (username === AuthCredenciales.Username && 
        password === AuthCredenciales.Password) {
         this.isAuthenticated = true;
          this.currentUser = username;
          return true;
    }
         return false;
  }*/

  /*logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUser(): string | null {
    return this.currentUser;
  }*/

  login(request: IRequestLogin): Observable<any> {
    return this._httpClient.post<IResponseLogin>(this.URL_LOGIN, request).pipe(
      map((response) => {
        // Guardar el token en el localStorage
        this.setToken(response.token);
        // Devolver la respuesta original
        return response;
      })
    );
  }

  setToken(token: any): void {
    //Guardamos el elemento accessToken cuyo valor es un objeto
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  sessionExpired() {
    const token = localStorage.getItem('accessToken');
     if (!token) {
      console.log('Token no encontrado');
       return true; // Considerar como sesión expirada si no hay token
    }
     return this._jwtHelper.isTokenExpired(token);
}
  


  removeToken() {
    localStorage.removeItem('accessToken');
  }
}
