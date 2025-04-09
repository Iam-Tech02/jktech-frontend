import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    const requestData = this.loginForm.value;

    this.apiService.apiRequest('POST', 'login', requestData).subscribe({
      next: (response) => {
        console.log('Login Successful:', response);
        alert('Login Successful!');
      },
      error: (error) => {
        console.error('Login Failed:', error);
        alert('Login Failed!');
      }
    });
  }
}
