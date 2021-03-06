import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from './../../core/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}payment`;
  }

  getAll() {
    return this.http.get<Payment[]>(`${this.endPoint}`);
  }

  getById(id: number) {
    return this.http.get<Payment>(`${this.endPoint}/${id}`);
  }
  
  getByProcess(idProcess: number) {
    return this.http.get<Payment[]>(`${this.endPoint}/process/${idProcess}`).toPromise();
  }

  create(payment: Payment) {
    return this.http.post<Payment>(`${this.endPoint}`, payment);
  }

  update(id: number, payment: Payment) {
    return this.http.patch(`${this.endPoint}/${id}`, payment)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, payment: Payment) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: payment
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }
}
