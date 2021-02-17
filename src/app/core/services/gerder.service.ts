import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Gender } from './../models/gerder.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class GerderService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}gender`;
  }

  getAll() {
    return this.http.get<Gender[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Gender>(`${this.endPoint}/${id}`).toPromise();
  }

  create(gender: Gender) {
    return this.http.post<Gender>(`${this.endPoint}`, gender);
  }

  update(id: number, gender: Gender) {
    return this.http.patch(`${this.endPoint}/${id}`, gender)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, gender: Gender) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: gender
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
