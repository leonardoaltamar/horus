import { UserType } from './../models/user-type.model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}user_type`;
  }
  getAll() {
    return this.http.get<UserType[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: number) {
    return this.http.get<UserType>(`${this.endPoint}/${id}`).toPromise();
  }

  create(userType: UserType) {
    return this.http.post<UserType>(`${this.endPoint}`, userType);
  }

  update(id: number, userType: UserType) {
    return this.http.patch(`${this.endPoint}/${id}`, userType)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, userType: UserType) {
    const httpUserType = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: userType
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpUserType)
      .pipe(map(x => {
        return x;
      }));
  }
}
