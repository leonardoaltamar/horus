import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Email } from './../models/email.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}email`;
  }

  getAll() {
    return this.http.get<Email[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Email>(`${this.endPoint}/${id}`).toPromise();
  }

  create(email: Email) {
    return this.http.post<Email>(`${this.endPoint}`, email);
  }

  update(id: number, email: Email) {
    return this.http.patch(`${this.endPoint}/${id}`, email)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${this.endPoint}/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }

}


