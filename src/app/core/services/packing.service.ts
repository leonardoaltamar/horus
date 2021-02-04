import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Packing } from './../../core/models';

@Injectable({
  providedIn: 'root'
})

export class PackingService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}packing`;
  }



  async getAll() {
    return this.http.get<Packing[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Packing>(`${this.endPoint}/${id}`).toPromise();
  }

  create(packing: Packing) {
    return this.http.post<Packing>(`${this.endPoint}`, packing);
  }

  update(id: number, packing: Packing) {
    return this.http.patch(`${this.endPoint}/${id}`, packing);
  }

  delete(id: number) {
    return this.http.delete(`${this.endPoint}/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }

}
