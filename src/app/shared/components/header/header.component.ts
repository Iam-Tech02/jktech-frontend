import { Component } from "@angular/core";
import { FirebaseService } from "../../../core/services/firebase.service";
import { ProfileService } from "src/app/core/services/profile.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  userInitials: string = "";
  userProfile: any;

  constructor(
    private firebaseService: FirebaseService,
    private profileService: ProfileService
  ) {
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.profileService.getProfile().subscribe((profile) => {
      this.userProfile = profile.result;
      this.setUserInitials();
    });
  }

  setUserInitials() {
    const nameParts = this.userProfile?.name ? this.userProfile.name.split(" ") : 'JOHN DOE'.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1] || ''; 
  
    this.userInitials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }
  

  logout() {
    this.firebaseService.firebaseLogout();
  }

}
