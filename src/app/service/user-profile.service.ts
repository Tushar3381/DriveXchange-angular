import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private baseUrl = API_ENDPOINTS.users;

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
    return this.http.post(`${API_ENDPOINTS.users}/change-password`, null, {
      params: data
    });  
  }
}
