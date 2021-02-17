import { Customer } from './../models/customer.model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}client`;
  }

  getAll() {
    return this.http.get<Customer[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Customer>(`${this.endPoint}/${id}`).toPromise();
  }

  create(customer: Customer) {
    return this.http.post<Customer>(`${this.endPoint}`, customer);
  }

  update(id: number, customer: Customer) {
    return this.http.patch(`${this.endPoint}/${id}`, customer)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, customer: Customer) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: customer
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}


