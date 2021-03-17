import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MobilePhone } from './../models/mobilePhone.model';


@Injectable({
  providedIn: 'root'
})
export class MobilePhoneService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}mobile_phone`;
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

  delete(id: number) {
    return this.http.delete(`${this.endPoint}/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }

}


