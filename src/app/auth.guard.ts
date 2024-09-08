import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const router= inject(Router);
  const jwtHelper = inject(JwtHelperService);

  const token = localStorage.getItem('accessToken');
  if (token) {
    return true; // El token es válido y no ha expirado
    console.log('Token valido encontrado');
  } else {
    console.log('Token no encontrado');
    router.navigate(['/loguin']); // Redirige a la página de login si el token no existe o ha expirado
    return false;
  }
};
