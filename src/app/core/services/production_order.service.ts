import { ProductionOrder } from './../models/production_order.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductionOrderService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}production`;
  }



  async getAll() {
    return this.http.get<ProductionOrder[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<ProductionOrder>(`${this.endPoint}/${id}`).toPromise();
  }

  create(productionOrder: ProductionOrder) {
    return this.http.post<ProductionOrder>(`${this.endPoint}`, productionOrder);
  }

  update(id: number, productionOrder: ProductionOrder) {
    return this.http.patch(`${this.endPoint}/${id}`, productionOrder);
    // .pipe(map(x => {
    //   return x;
    // }));
  }

  delete(id: number, productionOrder: ProductionOrder) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: productionOrder
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
