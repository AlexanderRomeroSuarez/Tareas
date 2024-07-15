import { Routes } from '@angular/router';
import { LoguinComponent } from './loguin/loguin.component';
import { TareasComponent } from './tareas/tareas.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoguinComponent },
    { path: 'tareas', component: TareasComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
  ];
