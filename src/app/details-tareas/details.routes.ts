import { Routes } from '@angular/router';

export default [
    { path: '', 
    loadComponent:() => import ('./details-tareas.component').then( x => x.DetailsTareasComponent)

  },

] as Routes;