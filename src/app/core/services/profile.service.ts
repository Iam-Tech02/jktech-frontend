import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from './api.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private fireAuth: AngularFireAuth,
    private apiService: ApiService
  ) {}

  getProfile(): Observable<any> {
    const loginType = localStorage.getItem('loginType');

    if (loginType === 'google' || loginType === 'facebook') {
      return from(this.fireAuth.currentUser).pipe(
        switchMap(user => {
          if (user) {
            return of({
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              provider: loginType
            });
          } else {
            return of(null);
          }
        })
      );
    } else if (loginType === 'email-password') {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return of(null);
      }
      return this.apiService.apiRequest('GET', `users/${userId}`);
    } else {
      return of(null);
    }
  }
}
