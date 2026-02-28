import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = "http://localhost:8080/api/payment";

  constructor(private http: HttpClient) { }

  createOrder(userId: any, carId: any, amount: any): Observable<any> {

    let params = new HttpParams()
      .set('userId', userId)
      .set('carId', carId)
      .set('amount', amount);

    return this.http.post(`${this.baseUrl}/create-order`, null, { params });
  }

  makePayment(orderId: any, mode: string, amount: any): Observable<any> {

    let params = new HttpParams()
      .set('orderId', orderId)
      .set('mode', mode)
      .set('amount', amount);

    return this.http.post(`${this.baseUrl}/pay`, null, { params });
  }

}
