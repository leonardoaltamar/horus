import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Location } from './../../core/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}location`;
  }

  getAll() {
    return this.http.get<Location[]>(`${this.endPoint}`);
  }

  getById(id: number) {
    return this.http.get<Location>(`${this.endPoint}/${id}`);
  }

  create(location: Location) {
    return this.http.post<Location>(`${this.endPoint}`, location);
  }

  update(id: number, location: Location) {
    return this.http.patch(`${this.endPoint}/${id}`, location)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${this.endPoint}/${id}`)
      .pipe(map(x => {
        return x;
      }
      ));
  }
}
