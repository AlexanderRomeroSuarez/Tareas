import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  //Se instalaron 2 paquetes para los mensajes popup

  //npm install @costlydeveloper/ngx-awesome-popup
  //npm install ngx-ui-loader
  let _toastEvokeService = inject(ToastrService);
  let _authService = inject(AuthService);
  let _router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 0:
          _toastEvokeService.error(
            'Error de Red',
            'No se puede conectar al servidor. Verifique su conexión a Internet o contacte al soporte.'
          );
          break;
        case 400:
          _toastEvokeService.error(
            'Solicitud Incorrecta',
            'Hay un problema con su solicitud. Por favor, verifique los datos enviados.'
          );

          break;
        case 401:
              _authService.removeToken();
              _router.navigate(['/loguin']);

          _toastEvokeService.error(
            'No autorizado',
            'No tienes autorización para acceder a este recurso. Por favor, inicia sesión.'
          );

          break;
        case 500:
          _toastEvokeService.error(
            'Error del Servidor',
            'Ocurrió un error en el servidor. Por favor, inténtelo más tarde.'
          );
          break;
        case 404:
          _toastEvokeService.error(
            'No Encontrado',
            'El recurso solicitado no se encontró intenta nuevamente más tarde.'
          );
          break;
      }

      return throwError(() => error);
    })
  );
};
