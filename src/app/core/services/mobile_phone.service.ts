import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MobilePhone } from './../models/mobilePhone.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MobilePhoneService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}mobilePhone`;
  }

  getAll() {
    return this.http.get<MobilePhone[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<MobilePhone>(`${this.endPoint}/${id}`).toPromise();
  }

  create(mobilePhone: MobilePhone) {
    return this.http.post<MobilePhone>(`${this.endPoint}`, mobilePhone);
  }

  update(id: number, mobilePhone: MobilePhone) {
    return this.http.patch(`${this.endPoint}/${id}`, mobilePhone)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, mobilePhone: MobilePhone) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: mobilePhone
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}


