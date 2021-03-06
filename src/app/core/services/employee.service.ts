import { Employee } from './../models/employee.model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}employee`;
  }

  getAll() {
    return this.http.get<Employee[]>(`${this.endPoint}`).toPromise();
  }

  getTop() {
    return this.http.get<Employee[]>(`${this.endPoint}/topEmployee`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Employee>(`${this.endPoint}/${id}`).toPromise();
  }

  create(employee: Employee) {
    return this.http.post<Employee>(`${this.endPoint}`, employee);
  }

  update(id: number, employee: Employee) {
    return this.http.patch(`${this.endPoint}/${id}`, employee)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, employee: Employee) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: employee
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}

