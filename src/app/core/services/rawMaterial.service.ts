import { rawMaterial } from '../models/raw-material.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RawMaterialService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}product`;
  }



  async getAll() {
    return this.http.get<rawMaterial[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<rawMaterial>(`${this.endPoint}/${id}`).toPromise();
  }

  create(rawMaterial: rawMaterial) {
    return this.http.post<rawMaterial>(`${this.endPoint}`, rawMaterial);
  }

  update(id: number, rawMaterial: rawMaterial) {
    return this.http.patch(`${this.endPoint}/${id}`, rawMaterial);
    // .pipe(map(x => {
    //   return x;
    // }));
  }

  delete(id: number, rawMaterial: rawMaterial) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: rawMaterial
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
