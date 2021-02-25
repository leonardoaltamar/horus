import { TypeEmployee } from './../models/type-employee.model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TypeEmployeeService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}type_employee`;
  }

  getAll() {
    return this.http.get<TypeEmployee[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<TypeEmployee>(`${this.endPoint}/${id}`).toPromise();
  }

  create(typeEmployee: TypeEmployee) {
    return this.http.post<TypeEmployee>(`${this.endPoint}`, typeEmployee);
  }

  update(id: number, typeEmployee: TypeEmployee) {
    return this.http.patch(`${this.endPoint}/${id}`, typeEmployee)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, typeEmployee: TypeEmployee) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: typeEmployee
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }
}