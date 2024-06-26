import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { packing } from '../models/packing.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PackingService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}box`;
  }



  async getAll() {
    return this.http.get<packing[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<packing>(`${this.endPoint}/${id}`).toPromise();
  }

  create(packing: packing) {
    return this.http.post<packing>(`${this.endPoint}`, packing);
  }

  update(id: number, packing:packing) {
    return this.http.patch(`${this.endPoint}/${id}`, packing);
      // .pipe(map(x => {
      //   return x;
      // }));
  }

  delete(id: number,packing:packing) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: packing
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
