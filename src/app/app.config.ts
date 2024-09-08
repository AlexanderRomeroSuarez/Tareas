import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptorApiInterceptor } from './interceptor-api.interceptor';
import { errorInterceptorInterceptor } from './error-interceptor.interceptor';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
//instale
//npm install ngx-toastr
//npm install @angular/animations@17.3.11

export function tokenGetter() {
  return localStorage.getItem("accessToken");
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([interceptorApiInterceptor, errorInterceptorInterceptor])
    ),
    importProvidersFrom(
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              allowedDomains: ["example.com"],
              disallowedRoutes: ["http://example.com/examplebadroute/"],
          },
      }),
  ),
    AuthService,
  ],
};
