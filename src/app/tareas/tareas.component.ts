import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  inject,
  viewChild,
  WritableSignal,
  Signal,
  signal,
  ViewChild,
  AfterViewInit,
  effect,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TareasService } from '../services/tareas.service';
import { CommonModule, NgIf } from '@angular/common';
import { TareaService } from '../services/tarea.service';
import { SharedDataServiceService } from '../services/shared-data-service.service';
import { LoguinComponent } from '../loguin/loguin.component';
import { RouterLink } from '@angular/router';
import { ValidacionNgIfDirective } from '../validacion-ng-if.directive';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    ValidacionNgIfDirective,
  ],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.scss',
})
export class TareasComponent implements OnInit {
  /*usuario: string | null = null;
  errorMessage: string = '';
  tareaForm!: FormGroup;
 tareasService = inject(TareasService);
            fb = inject(FormBuilder);
   authService = inject(AuthService);
        tareas = this.tareasService.getTareas();

  ngOnInit(): void {
    this.tareaForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
    });
  }

  get descripcion() : FormControl<string> {
    return this.tareaForm.get('descripcion')?.value
  }

   addTarea(): void {
    if (this.tareaForm.valid) {
        this.existeTarea();
    }
  }

  existeTarea(){
    const nuevaTarea = this.tareaForm.value.descripcion.trim();
    if (this.tareas.some(tarea => tarea.descripcion === nuevaTarea)) {
      this.errorMessage = 'La tarea ya existe';
      return;
    }
    this.tareasService.addTarea(this.tareaForm.value.descripcion);
    this.tareaForm.reset();
    this.tareas = this.tareasService.getTareas(); 
    this.errorMessage = '';
  }

  onKeydown(event: any) {
    if (event.key === "Enter") {
      this.existeTarea(); 
    }
  }

  eliminarTarea(index: number): void {
    this.tareasService.deleteTarea(index);
    this.errorMessage = '';
  }

  completarTarea(index: number): void {
    this.tareasService.completeTarea(index);
  }*/

  usuarioForm!: FormGroup;
  #fb = inject(FormBuilder);
  #tareaService = inject(TareaService);
  #userService = inject(SharedDataServiceService);
  showDetailField: boolean[] = [];
  shouldShow!: boolean;

  //txtFechaVencimiento: Signal<ElementRef | undefined> =viewChild.required('fechaVencimiento');
  txtFechaVencimiento = viewChild.required<ElementRef>('fechaVencimiento');
  username!: '';
  mostrarElemento = false;
  @ViewChild(LoguinComponent, { static: true }) teacher!: LoguinComponent;
  ngOnInit(): void {
    this.usuarioForm = this.#fb.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      tareas: this.#fb.array([this.nuevaTarea()]),
    });

    // Suscribirse a los cambios del radioButton en el primer FormGroup del FormArray
    this.tareas
      .at(0)
      .get('completed')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.shouldShow = true;
        } else {
          this.shouldShow = false;
        }

        console.log(this.shouldShow);
      });
  }

  constructor() {
    effect(() => {
      //console.log('mensajeeeeeeee44'  + this.teacher.usernamed);
      this.txtFechaVencimiento()?.nativeElement.addEventListener(
        'click',
        () => {
          console.log('mensajeeeeeeee');
          this.tareas.controls.forEach((_, index) => {
            const taskGroup = this.tareas.at(index) as FormGroup;

            const fechaCreacionControl = taskGroup.get('fechaCreacion');
            const fechaVencimientoControl = taskGroup.get('fechaVencimiento');

            //Limpia los errores anteriores
            //fechaVencimientoControl?.setErrors(null);
            //Configura las suscripciones para detectar cambios
            fechaVencimientoControl?.valueChanges.subscribe(() => {
              if (
                new Date(fechaVencimientoControl?.value) <=
                new Date(fechaCreacionControl?.value)
              ) {
                taskGroup.get('fechaVencimiento')?.setErrors({
                  fechaInvalida:
                    'La fecha final debe ser mayor que la fecha de inicio.',
                });
              } else {
                taskGroup.get('fechaVencimiento')?.setErrors(null);
              }
            });
          });
        }
      );
    });
  }

  get tareas(): FormArray {
    return this.usuarioForm.get('tareas') as FormArray;
  }

  setupValueChanges(): void {
    this.tareas.controls.forEach((form, index) => {
      const taskGroup = this.tareas.at(index) as FormGroup;
      const completedControl = taskGroup.get('completed');

      completedControl?.valueChanges.subscribe((value) => {
        this.showDetailField[index] = value;
      });
    });
  }

  nuevaTarea(): FormGroup {
    return this.#fb.group({
      tareaId: [0],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      completed: [true, Validators.required],
      usuarioId: [0, Validators.required],
      fechaCreacion: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      prioridad: [''],
      estado: [''],
    });
  }

  get usuario() {
    return this.tareas.get('usuario')?.value;
  }

  get contrasena(): FormControl<string> {
    return this.tareas.get('contraseña')?.value;
  }

  get completed(): FormControl<Boolean> {
    return this.tareas.get('completed')?.value;
  }

  agregarTarea(): void {
    this.tareas.push(this.nuevaTarea());
  }

  removerTarea(indice: number): void {
    this.tareas.removeAt(indice);
  }

  //La doble negación !! se usa para convertir un valor en un booleano.
  //Para el manejo de errores
  esCampoInvalidoControl(controlName: string): boolean {
    const control = this.usuarioForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  esCampoInvalido(index: number, controlName: string): boolean {
    const control = this.tareas.at(index).get(controlName);
    return !!(
      control &&
      control.hasError('required') &&
      (control.touched || control.dirty)
    );
  }

  /*validarFechas(index: number, controlName: string): void{

    const task = this.tareas.at(index).get(controlName);

    const fechaInicial = task?.get("fechaCreacion")?.value;
    const fechaFinal = task?.get("fechaVencimiento")?.value;

    if(fechaFinal > fechaInicial){
      task?.get('fechaVencimiento')?.setErrors({ fechaInvalida: true });
    }

  }*/

  //Para el manejo de Validaciones de Fecha
  /*setupValidation(): void {
    this.tareas.controls.forEach((taskGroup, index) => {
      const fechaCreacionControl = taskGroup.get('fechaCreacion');
      const fechaVencimientoControl = taskGroup.get('fechaVencimiento');
     taskGroup.get('fechaVencimiento')?.setErrors(null);
      fechaVencimientoControl?.valueChanges.subscribe(() => {
          
            if (new Date(fechaVencimientoControl?.value) <= new Date(fechaCreacionControl?.value)) {
              taskGroup.get('fechaVencimiento')?.setErrors({ fechaInvalida: 'La fecha final debe ser mayor que la fecha de inicio.' });
            } else {
              taskGroup.get('fechaVencimiento')?.setErrors(null);
            }
          
        });    
    });
  }*/

  setupValidation(): void {
    this.tareas.controls.forEach((_, index) => {
      const taskGroup = this.tareas.at(index) as FormGroup;

      const fechaCreacionControl = taskGroup.get('fechaCreacion');
      const fechaVencimientoControl = taskGroup.get('fechaVencimiento');

      //Limpia los errores anteriores
      //fechaVencimientoControl?.setErrors(null);

      //Configura las suscripciones para detectar cambios
      fechaVencimientoControl?.valueChanges.subscribe(() => {
        if (
          new Date(fechaVencimientoControl?.value) <=
          new Date(fechaCreacionControl?.value)
        ) {
          taskGroup.get('fechaVencimiento')?.setErrors({
            fechaInvalida:
              'La fecha final debe ser mayor que la fecha de inicio.',
          });
        } else {
          taskGroup.get('fechaVencimiento')?.setErrors(null);
        }
      });
    });
  }

  /*validateDates(index: number): void {
    const taskGroup = this.tareas.at(index) as FormGroup;
    const fechaCreacion = taskGroup.get('fechaCreacion')?.value;
    const fechaVencimiento = taskGroup.get('fechaVencimiento')?.value;
  
    taskGroup.get('fechaVencimiento')?.setErrors(null);

    if (fechaCreacion && fechaVencimiento) {
      if (new Date(fechaVencimiento) <= new Date(fechaCreacion)) {

        taskGroup.get('fechaVencimiento')?.setErrors({ fechaInvalida: 'La fecha final debe ser mayor que la fecha de inicio.' });
      } else {
        taskGroup.get('fechaVencimiento')?.setErrors(null);
      }
    }
  }*/

  esFechaInvalida(index: number): string | null {
    const task = this.tareas.at(index) as FormGroup;
    const fechaVencimientoControl = task.get('fechaVencimiento');
    const error = fechaVencimientoControl?.errors?.['fechaInvalida'];
    return (fechaVencimientoControl?.touched ||
      fechaVencimientoControl?.dirty) &&
      error
      ? error
      : null;
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.#tareaService.createConcert(this.usuarioForm.value).subscribe({
        next: (response) => {
          console.log('Tareas guardadas exitosamente', response);
        },
        error: (err) => {
          console.error('Error al guardar las tareas', err);
        },
      });
    } else {
      this.usuarioForm.markAllAsTouched();
    }
  }
}
