import { Injectable } from '@angular/core';
import { AuthCredenciales } from '../auth.enum';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private currentUser: string | null = null;

  login(username: string, password: string): boolean {
    if (username === AuthCredenciales.Username && 
        password === AuthCredenciales.Password) {
         this.isAuthenticated = true;
          this.currentUser = username;
          return true;
    }
         return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUser(): string | null {
    return this.currentUser;
  }
}
