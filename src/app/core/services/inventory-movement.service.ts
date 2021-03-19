import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { InventoryMovement } from './../models';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class InventoryMovementService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}mov_inventary`;
  }

  getAll() {
    return this.http.get<InventoryMovement[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<InventoryMovement>(`${this.endPoint}/${id}`).toPromise();
  }

  create(inventoryMovement: InventoryMovement) {
    return this.http.post<InventoryMovement>(`${this.endPoint}`, inventoryMovement);
  }

  update(id: number, inventoryMovement: InventoryMovement) {
    return this.http.patch(`${this.endPoint}/${id}`, inventoryMovement)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, inventoryMovement: InventoryMovement) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: inventoryMovement
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
