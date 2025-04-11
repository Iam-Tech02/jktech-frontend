import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  apiRequest(method: string, endpoint: string, data?: any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;

    switch (method.toUpperCase()) {
      case 'GET':
        return this.http.get(url).pipe(catchError(this.handleError));
      case 'POST':
        return this.http.post(url, data).pipe(catchError(this.handleError));
      case 'PUT':
        return this.http.put(url, data).pipe(catchError(this.handleError));
      case 'DELETE':
        return this.http.delete(url).pipe(catchError(this.handleError));
      default:
        throw new Error('Invalid HTTP method');
    }
  }
}
