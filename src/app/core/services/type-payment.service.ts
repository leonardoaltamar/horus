import { TypePayment } from './../models/type-payment.model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TypePaymentService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}type_payment`;
  }

  getAll() {
    return this.http.get<TypePayment[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<TypePayment>(`${this.endPoint}/${id}`).toPromise();
  }

  create(typePayment: TypePayment) {
    return this.http.post<TypePayment>(`${this.endPoint}`, typePayment);
  }

  update(id: number, typePayment: TypePayment) {
    return this.http.patch(`${this.endPoint}/${id}`, typePayment)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, typePayment: TypePayment) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: typePayment
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }
}