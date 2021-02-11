import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Option } from './../../core/models/option.model';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private endPoint: string;
  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}option`;
  }
  getAll() {
    return this.http.get<Option[]>(`${this.endPoint}`);
  }

  getById(id: string) {
    return this.http.get<Option>(`${this.endPoint}/${id}`);
  }

  create(option: Option) {
    return this.http.post<Option>(`${this.endPoint}`, option);
  }

  update(id: number, option: Option) {
    return this.http.patch(`${this.endPoint}/${id}`, option);
    // .pipe(map(x => {
    //   return x;
    // }));
  }

  delete(id: number, option: Option) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: option
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));

  }

}
