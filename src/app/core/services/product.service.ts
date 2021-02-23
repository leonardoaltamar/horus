import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}product`;
  }

  async getAll() {
    return this.http.get<Product[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Product>(`${this.endPoint}/${id}`).toPromise();
  }

  create(product: Product) {
    return this.http.post<Product>(`${this.endPoint}`, product);
  }

  update(id: number, product: Product) {
    return this.http.patch(`${this.endPoint}/${id}`, product);
    // .pipe(map(x => {
    //   return x;
    // }));
  }

  delete(id: number, product: Product) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: product
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
