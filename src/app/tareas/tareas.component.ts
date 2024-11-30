import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TareasService } from '../services/tareas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.scss'
})
export class TareasComponent implements OnInit {
  usuario: string | null = null;
  tareaForm!: FormGroup;
 tareasService = inject(TareasService);
             fb = inject(FormBuilder);
    authService = inject(AuthService);

  tareas = this.tareasService.getTareas();
  ngOnInit(): void {
    this.tareaForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
    });
    this.usuario = this.authService.getUser();
  }

  get descripcion() : FormControl<string> {
    return this.tareaForm.get('descripcion')?.value
  }

   addTarea(): void {
    if (this.tareaForm.valid) {
      this.tareasService.addTarea(this.tareaForm.value.descripcion);
      this.tareaForm.reset();
      this.tareas = this.tareasService.getTareas(); // Actualiza la lista de tareas después de agregar
    }
  }


  onKeydown(event: any) {
    if (event.key === "Enter") {
      this.tareasService.addTarea(this.tareaForm.value.descripcion);
      this.tareaForm.reset();
      this.tareas = this.tareasService.getTareas(); // Actualiza la lista de tareas después de agregar
   
    }
  }

  eliminarTarea(index: number): void {
    this.tareasService.deleteTarea(index); //Elimina las tares despúes de agregar 
  }

  completarTarea(index: number): void {
    this.tareasService.completeTarea(index);
  }
}