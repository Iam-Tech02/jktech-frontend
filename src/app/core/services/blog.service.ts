import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Blog {
  id: number;
  title: string;
  content: string;
  brief: string;
  about: string;
  addedBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  result: T[];
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = `${environment.apiUrl}/api/v1/blogs`;

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

  // Create a new blog
  createBlog(blogData: Partial<Blog>): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.baseUrl, blogData)
      .pipe(catchError(this.handleError));
  }

  // Get all blogs with optional pagination
  getBlogs(page?: number): Observable<PaginatedResponse<Blog>> {
    const url = page ? `${this.baseUrl}?page=${page}` : this.baseUrl;
    return this.http.get<PaginatedResponse<Blog>>(url)
      .pipe(catchError(this.handleError));
  }

  // Get a single blog by ID
  getBlog(id: number): Observable<{ result: Blog; message: string }> {
    return this.http.get<{ result: Blog; message: string }>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Update an existing blog
  updateBlog(id: number, blogData: Partial<Blog>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/${id}`, blogData)
      .pipe(catchError(this.handleError));
  }

  // Delete a blog
  deleteBlog(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getBlogById(id: number) {
    return this.http.get<{ result: Blog; message: string }>(`${this.baseUrl}/${id}`);
  }
} 