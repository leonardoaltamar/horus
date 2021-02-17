import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { City } from './../models/city.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}city`;
  }

  getAll() {
    return this.http.get<City[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<City>(`${this.endPoint}/${id}`).toPromise();
  }

  create(city: City) {
    return this.http.post<City>(`${this.endPoint}`, city);
  }

  update(id: number, city: City) {
    return this.http.patch(`${this.endPoint}/${id}`, city)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, city: City) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: city
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}


