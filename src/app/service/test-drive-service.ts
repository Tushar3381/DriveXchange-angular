import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/api.config';


@Injectable({
  providedIn: 'root'
})
export class TestDriveService  {

  private baseUrl = API_ENDPOINTS.testDrive;

  constructor(private http: HttpClient) {}

  requestTestDrive(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/request`, data);         //REQUEST TO ADMIN FOR TEST DRIVE
  }

  getAllRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);                  //GET ALL REQUEST FOR THE TEST DRIVE
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}?status=${status}`, {});   //APPROVE REJECT TEST DRIVE TEST
  }
}
