import { SalesMan } from './../models/salesMan.model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SalesManService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}seller`;
  }

  getAll() {
    return this.http.get<SalesMan[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<SalesMan>(`${this.endPoint}/${id}`).toPromise();
  }

  create(salesMan: SalesMan) {
    return this.http.post<SalesMan>(`${this.endPoint}`, salesMan);
  }

  update(id: number, salesMan: SalesMan) {
    return this.http.patch(`${this.endPoint}/${id}`, salesMan)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, salesMan: SalesMan) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: salesMan
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}


