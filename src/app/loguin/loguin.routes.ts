import { Routes } from "@angular/router";
import { LoguinComponent } from "./loguin.component";

export default[

    { path: '', 
      loadComponent:() => import ('./loguin.component').then( x => x.LoguinComponent)

    },
   
  ] as Routes;