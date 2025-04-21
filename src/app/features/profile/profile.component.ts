import { Component } from "@angular/core";
import { ProfileService } from "src/app/core/services/profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  constructor(private profileService: ProfileService) {}
  userProfile: any;

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.profileService.getProfile().subscribe((profile) => {
      console.log(profile);
      this.userProfile = profile;
    });
  }
}
