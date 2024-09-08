import { Routes } from '@angular/router';
import { authGuard } from '../auth.guard';

export default[

    { path: '', 
      canActivate : [authGuard],
      loadComponent:() => import ('./tareas.component').then( x => x.TareasComponent)

    },
   
  ] as Routes;