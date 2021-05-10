import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DetailProduct } from './../models/';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DetailProductService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}detail_product`;
  }

  getAll() {
    return this.http.get<DetailProduct[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<DetailProduct>(`${this.endPoint}/${id}`).toPromise();
  }

  create(detailProduct: DetailProduct) {
    return this.http.post<DetailProduct>(`${this.endPoint}`, detailProduct);
  }

  update(id: number, detailProduct: DetailProduct) {
    return this.http.patch(`${this.endPoint}/${id}`, detailProduct)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, detailProduct: DetailProduct) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: detailProduct
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
