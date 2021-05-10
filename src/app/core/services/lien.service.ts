import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Lien } from './../models/';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LienService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}lien`;
  }

  getAll() {
    return this.http.get<Lien[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Lien>(`${this.endPoint}/${id}`).toPromise();
  }

  create(lien: Lien) {
    return this.http.post<Lien>(`${this.endPoint}`, lien);
  }

  update(id: number, lien: Lien) {
    return this.http.patch(`${this.endPoint}/${id}`, lien)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, lien: Lien) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: lien
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }
}
