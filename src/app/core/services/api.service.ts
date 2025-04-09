import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://your-api-url.com/api'; // Change this to your API base URL

  constructor(private http: HttpClient) {}

  apiRequest(method: string, endpoint: string, data?: any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;

    switch (method.toUpperCase()) {
      case 'GET':
        return this.http.get(url);
      case 'POST':
        return this.http.post(url, data);
      case 'PUT':
        return this.http.put(url, data);
      case 'DELETE':
        return this.http.delete(url);
      default:
        throw new Error('Invalid HTTP method');
    }
  }
}
