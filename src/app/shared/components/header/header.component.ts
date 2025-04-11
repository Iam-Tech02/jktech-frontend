import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../core/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userInitials: string = '';

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    this.setUserInitials();
  }

  setUserInitials() {
    const user = { firstName: 'John', lastName: 'Doe' }; 
    this.userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }

  logout() {
    this.firebaseService.firebaseLogout();
  }
}
