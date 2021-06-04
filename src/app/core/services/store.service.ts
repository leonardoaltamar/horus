import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from './../models/store.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}store`;
  }

  getAll() {
    return this.http.get<Store[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Store>(`${this.endPoint}/${id}`).toPromise();
  }

  create(store: Store) {
    return this.http.post<Store>(`${this.endPoint}`, store);
  }

  update(id: number, store: Store) {
    return this.http.patch(`${this.endPoint}/${id}`, store)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number,store:Store) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: store
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}


