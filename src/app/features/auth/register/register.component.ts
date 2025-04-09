import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  // Custom Validator: Check if password & confirmPassword match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  registerUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    const requestData = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.apiService.apiRequest('POST', 'register', requestData).subscribe({
      next: (response) => {
        console.log('Registration Successful:', response);
        alert('Registration Successful! Please log in.');
      },
      error: (error) => {
        console.error('Registration Failed:', error);
        alert('Registration Failed! Please try again.');
      }
    });
  }
}
