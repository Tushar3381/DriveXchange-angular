import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  
  constructor(private ht : HttpClient) { }

  one(a1 : Admin)
  {
    let url="http://localhost:8080/admin/saveAdminInfo";
    return this.ht.post(url,a1);
  }

  login(aemail: string, apass: string): Observable<any> {
    return this.ht.post("http://localhost:8080/admin/login", { aemail, apass });
  }

  getDashboard(): Observable<any> {
    return this.ht.get("http://localhost:8080/admin/dash");
  }

}
