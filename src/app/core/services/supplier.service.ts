import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Supplier } from './../models/supplier.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}supplier`;
  }

  getAll() {
    return this.http.get<Supplier[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Supplier>(`${this.endPoint}/${id}`).toPromise();
  }

  create(supplier: Supplier) {
    return this.http.post<Supplier>(`${this.endPoint}`, supplier);
  }

  update(id: number, supplier: Supplier) {
    return this.http.patch(`${this.endPoint}/${id}`, supplier)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, supplier: Supplier) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: supplier
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }
}


