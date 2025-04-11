import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private firebaseService: FirebaseService,
    private router: Router,
    public fireAuth: AngularFireAuth,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  async googleLogin() {
    try {
      console.log('Starting Google login...');
      const response = await this.fireAuth.signInWithPopup(new GoogleAuthProvider());
      console.log('Firebase auth response:', response);
      
      const credentials = {
        token: (response.credential as any)?.idToken,
        email: response.user?.email,
        name: response.user?.displayName,
        id: (response.additionalUserInfo?.profile as any)?.id,
      };
      console.log('Sending credentials to backend:', credentials);
      
      this.firebaseService.firebaseOAuthLogin(credentials).subscribe({
        next: (response) => {
          console.log('Backend response:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Google login failed:', error);
          console.error('Error details:', {
            status: error.status,
            message: error.message,
            error: error.error
          });
          alert('Google login failed! Check console for details.');
        }
      });
    } catch (error) {
      console.error('Google popup failed:', error);
      console.error('Popup error details:', error);
      alert('Google popup failed! Check console for details.');
    }
  }

  async facebookLogin() {
    try {
      const response = await this.fireAuth.signInWithPopup(new FacebookAuthProvider());
      const credentials = {
        token: (response.credential as any)?.accessToken,
        email: response.user?.email,
        name: response.user?.displayName,
        id: (response.additionalUserInfo?.profile as any)?.id,
      };
      
      this.firebaseService.firebaseOAuthLogin(credentials).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Facebook login failed:', error);
          alert('Facebook login failed!');
        }
      });
    } catch (error) {
      console.error('Facebook popup failed:', error);
      alert('Facebook popup failed!');
    }
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
