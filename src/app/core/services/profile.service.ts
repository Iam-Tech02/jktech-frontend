import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ApiService } from "./api.service";
import { Observable, from, of } from "rxjs";
import { switchMap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(
    private fireAuth: AngularFireAuth,
    private apiService: ApiService
  ) {}

  getProfile(): Observable<any> {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return of(null);
    }
    return this.apiService.apiRequest("GET", `api/v1/users/${userId}`);
  }

}
