import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }
// GET USER PROFILE
  getUserProfile(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile/${id}`);
  }
// UPDATE USER PROFILE
  updateUserProfile(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile/update`, user);
  }
// USER CHANGE THE PASSWORD
changePassword(data: any) {
  return this.http.post('http://localhost:8080/users/change-password', null, {
    params: data
  });  
}
}
