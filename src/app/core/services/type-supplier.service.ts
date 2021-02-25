import { TypeSupplier } from './../models/type-supplier.model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TypeSupplierService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}type_supplier`;
  }

  getAll() {
    return this.http.get<TypeSupplier[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<TypeSupplier>(`${this.endPoint}/${id}`).toPromise();
  }

  create(typeSupplier: TypeSupplier) {
    return this.http.post<TypeSupplier>(`${this.endPoint}`, typeSupplier);
  }

  update(id: number, typeSupplier: TypeSupplier) {
    return this.http.patch(`${this.endPoint}/${id}`, typeSupplier)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, typeSupplier: TypeSupplier) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: typeSupplier
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }
}