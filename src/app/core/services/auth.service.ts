import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface OAuthCredentials {
  provider: 'google' | 'facebook';
  user: {
    token: string;
    email: string;
    name: string;
    id: string;
  };
}

export interface AuthResponse {
  access_token: string;
  user?: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api/v1/auth`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || `Error Code: ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Regular login
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  // OAuth login
  browserLogin(credentials: OAuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/browser/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  // Google OAuth redirect
  initiateGoogleAuth(): void {
    window.location.href = `${this.baseUrl}/google/login`;
  }

  // Facebook OAuth redirect
  initiateFacebookAuth(): void {
    window.location.href = `${this.baseUrl}/facebook/login`;
  }
} 