import { Routes } from '@angular/router';
import { LoguinComponent } from './loguin/loguin.component';
import { TareasComponent } from './tareas/tareas.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'loguin', loadChildren: () => import('./loguin/loguin.routes') },
  { path: 'tareas', loadChildren: () => import('./tareas/tareas.routes') },
  { path: 'details-tareas/:id', loadChildren: () => import('./details-tareas/details.routes') },
  { path: '', redirectTo: '/loguin', pathMatch: 'full' },
  { path: '**', redirectTo: '/loguin' },
];
