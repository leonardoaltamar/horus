import { Measurement } from './../models/measurement.model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}measurement`;
  }

  getAll() {
    return this.http.get<Measurement[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Measurement>(`${this.endPoint}/${id}`).toPromise();
  }

  create(measurement: Measurement) {
    return this.http.post<Measurement>(`${this.endPoint}`, measurement);
  }

  update(id: number, measurement: Measurement) {
    return this.http.patch(`${this.endPoint}/${id}`, measurement)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, measurement: Measurement) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: measurement
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}


