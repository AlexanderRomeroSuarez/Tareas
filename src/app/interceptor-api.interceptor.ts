import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const interceptorApiInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken =localStorage.getItem('accessToken');
  const _authService = inject(AuthService);

  console.log("token--->" + authToken);
  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
  return next(req);
};
