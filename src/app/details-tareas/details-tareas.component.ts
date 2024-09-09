import { Component, Input, inject, input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details-tareas',
  standalone: true,
  imports: [],
  templateUrl: './details-tareas.component.html',
  styleUrl: './details-tareas.component.scss'
})
export class DetailsTareasComponent {
  //public productId:  string | null = ''
  #route = inject(ActivatedRoute);

   //@Input('id') productId! :  string | null;
   Id = input.required<string>();
  ngOnInit() {
    // Primera Forma de recuperar el Id
      //this.productId = this.#route.snapshot.paramMap.get("id");

    // Segunda Forma de recuperar el Id
      //this.productId = this.#route.snapshot.params?.['id'];

    //Tercera Forma de recuperar el Id
      /*this.#route.params.subscribe((params: Params) => {
         this.productId = params['id'];
      })*/
     
      /*this.#route.paramMap.subscribe((params) => {
        this.productId = params.get('id');
     })*/

     console.log("El codigo del producto :" + this.Id);     
  }
}
