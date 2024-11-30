import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, 
         FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loguin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loguin.component.html',
  styleUrl: './loguin.component.scss'
})
export class LoguinComponent {
  loginForm!: FormGroup;
  errorMessage = '';

  private fb = inject(FormBuilder);
  private authService=  inject(AuthService);
  private router=  inject(Router);
 
  ngOnInit(): void {
    this.loginForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get userName() : FormControl<string> {
    return this.loginForm.get('username')?.value
  }

  get password(): FormControl<string>  {
    return this.loginForm.get('password')?.value
  }
  
  onSubmit(): void {
    
    if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
    if (this.authService.login(username, password)) {
        this.router.navigate(['/tareas']);
    } else {
        this.errorMessage = 'Usuario y/o contraseña incorrecto';
        this.userName.setErrors({ incorrect: true });
        this.password.setErrors({ incorrect: true });
    }
  }

  }

}
