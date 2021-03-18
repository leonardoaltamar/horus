import { RawMaterial } from '../models/raw-material.model';
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
    this.endPoint = `${environment.apiUrl}raw_material`;
  }



  async getAll() {
    return this.http.get<RawMaterial[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<RawMaterial>(`${this.endPoint}/${id}`).toPromise();
  }

  create(rawMaterial: RawMaterial) {
    return this.http.post<RawMaterial>(`${this.endPoint}`, rawMaterial);
  }

  update(id: number, rawMaterial: RawMaterial) {
    return this.http.patch(`${this.endPoint}/${id}`, rawMaterial);
    // .pipe(map(x => {
    //   return x;
    // }));
  }

  // delete(id: number) {
  //   return this.http.delete(`${this.endPoint}/${id}`)
  //     .pipe(map(x => {
  //       return x;
  //     }
  //     ));
  // }

  delete(id: number, rawMaterial: RawMaterial) {
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
