import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { State } from './../models/state.modal';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}state`;
  }

  getAll() {
    return this.http.get<State[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<State>(`${this.endPoint}/${id}`).toPromise();
  }

  create(state: State) {
    return this.http.post<State>(`${this.endPoint}`, state);
  }

  update(id: number, state: State) {
    return this.http.patch(`${this.endPoint}/${id}`, state)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, state: State) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: state
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }
}


