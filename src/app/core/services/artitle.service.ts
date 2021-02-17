import { Artitle } from './../models/artitle.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ArtitleService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}artitle`;
  }



  async getAll() {
    return this.http.get<Artitle[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Artitle>(`${this.endPoint}/${id}`).toPromise();
  }

  create(artitle: Artitle) {
    return this.http.post<Artitle>(`${this.endPoint}`, artitle);
  }

  update(id: number, artitle: Artitle) {
    return this.http.patch(`${this.endPoint}/${id}`, artitle);
    // .pipe(map(x => {
    //   return x;
    // }));
  }

  delete(id: number, artitle: Artitle) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: artitle
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
