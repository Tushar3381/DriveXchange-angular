import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from './core/api.config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  
  constructor(private ht : HttpClient) { }

  one(a1 : Admin)
  {
    let url = `${API_ENDPOINTS.admin}/saveAdminInfo`;
    return this.ht.post(url,a1);
  }

  login(aemail: string, apass: string): Observable<any> {
    return this.ht.post(`${API_ENDPOINTS.admin}/login`, { aemail, apass });
  }

  getDashboard(): Observable<any> {
    return this.ht.get(`${API_ENDPOINTS.admin}/dash`);
  }

}
