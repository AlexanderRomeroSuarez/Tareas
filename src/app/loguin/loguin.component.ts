import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  inject,
  Signal,
  viewChild,
  ViewChild,
  signal,
  effect,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';
import { SharedDataServiceService } from '../services/shared-data-service.service';
//se instaló para el loading al loguearse --> npm install ngx-spinner
@Component({
  selector: 'app-loguin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './loguin.component.html',
  styleUrl: './loguin.component.scss',
})
export class LoguinComponent {
  loginForm!: FormGroup;

  #_fb = inject(NonNullableFormBuilder);
  _authService = inject(AuthService);
  _dataService = inject(SharedDataServiceService);
  _router = inject(Router);
  #_toastEvokeService = inject(ToastrService);
  #_spinnerService = inject(NgxSpinnerService);
  usernamed: string = '';

  btn = viewChild<ElementRef | undefined>('onSubmit');

  user = viewChild.required<ElementRef>('userr');

  ngOnInit(): void {
    this.loginForm = this.#_fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  constructor() {
    effect(() => {
      this.user()?.nativeElement.focus();

      this.btn()?.nativeElement.addEventListener('click', () => {
        if (this.loginForm.valid) {
          const { username, password } = this.loginForm.getRawValue();
          this.#_spinnerService.show();
          setTimeout(() => {
            this._authService
              .login({ usuario: username, password: password })
              .subscribe({
                next: (response) => {
                  this.#_spinnerService.hide();

                  this.usernamed = this.user()?.nativeElement.value;
                  console.log('Title: ', this.usernamed);

                  this._router.navigate(['/tareas']);
                },
                error: (error) => {
                  this.#_spinnerService.hide();
                },
              });
          }, 5000);
        }
      });
    });
  }

  ngAfterViewInit() {}

  get userName(): FormControl<string> {
    return this.loginForm.get('username')?.value;
  }

  get password(): FormControl<string> {
    return this.loginForm.get('password')?.value;
  }


}
