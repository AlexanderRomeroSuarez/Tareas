import { Injectable } from '@angular/core';
import { Tareas } from '../tareas';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private tareas: Tareas[] = [];

  getTareas(): Tareas[] {
    return this.tareas;
  }

  addTarea(descripcion: string): void {
    this.tareas.push({ descripcion, completed: false });
  }

  deleteTarea(index: number): void {
    this.tareas.splice(index, 1);
  }

  completeTarea(index: number): void {
    this.tareas[index].completed = !this.tareas[index].completed;
  }
}
