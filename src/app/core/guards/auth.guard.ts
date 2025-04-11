import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.firebaseService.checkFirebaseAuth()) {
      return true;
    }
    
    this.router.navigate(['/auth/login']);
    return false;
  }
} 