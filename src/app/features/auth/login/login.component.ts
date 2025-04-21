import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,   // ✅ Inject Toastr
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
      const response = await this.fireAuth.signInWithPopup(new GoogleAuthProvider());
      
      const credentials = {
        token: (response.credential as any)?.idToken,
        email: response.user?.email,
        name: response.user?.displayName,
        id: (response.additionalUserInfo?.profile as any)?.id,
      };

      this.firebaseService.firebaseOAuthLogin(credentials).subscribe({
        next: (res:any) => {
          this.saveLoginData(res.user.id);
          this.toastr.success('Logged in with Google successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Google login failed:', error);
          this.toastr.error('Google login failed! Check console for details.');
        }
      });
    } catch (error) {
      console.error('Google popup failed:', error);
      this.toastr.error('Google popup failed! Check console for details.');
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
        next: (res:any) => {
          this.saveLoginData(res.user.id);
          this.toastr.success('Logged in with Facebook successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Facebook login failed:', error);
          this.toastr.error('Facebook login failed! Check console for details.');
        }
      });
    } catch (error) {
      console.error('Facebook popup failed:', error);
      this.toastr.error('Facebook popup failed!');
    }
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.toastr.warning('Please enter valid login credentials.');
      return;
    }

    const requestData = this.loginForm.value;

    this.apiService.apiRequest('POST', 'login', requestData).subscribe({
      next: (res) => {
        this.saveLoginData(res.user.id);
        this.toastr.success('Login Successful!');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login Failed:', error);
        this.toastr.error('Invalid login details!');
      }
    });
  }

  saveLoginData(id: number) {
    localStorage.setItem('userId', String(id));
  }
}


