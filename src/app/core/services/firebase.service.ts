import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { AuthService, AuthResponse, OAuthCredentials } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private jwtHelper = new JwtHelperService();
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(Router) private router: Router
  ) { }

  firebaseLogin(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.authService.login(credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/home']);
        })
      );
  }

  checkFirebaseAuth(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  firebaseLogout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  getFirebaseRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role;
    }
    return null;
  }

  firebaseOAuthLogin(credentials: any): Observable<AuthResponse> {
    const oauthCredentials: OAuthCredentials = {
      provider: 'google',
      user: {
        token: credentials.token,
        email: credentials.email,
        name: credentials.name,
        id: credentials.id
      }
    };

    return this.authService.browserLogin(oauthCredentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/dashboard']);
        })
      );
  }

  initiateGoogleAuth(): void {
    this.authService.initiateGoogleAuth();
  }
} 