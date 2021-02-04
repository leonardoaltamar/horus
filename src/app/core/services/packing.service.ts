import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { packing } from '../models/packing.model';

@Injectable({
  providedIn: 'root'
})
export class PackingService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}gender`;
  }



  async getAll() {
    return this.http.get<packing[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<packing>(`${this.endPoint}/${id}`).toPromise();
  }

  create(gender: packing) {
    return this.http.post<packing>(`${this.endPoint}`, gender);
  }

  update(id: number, gender:packing) {
    return this.http.patch(`${this.endPoint}/${id}`, gender);
      // .pipe(map(x => {
      //   return x;
      // }));
  }

  delete(id: number) {
    return this.http.delete(`${this.endPoint}/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }

}
