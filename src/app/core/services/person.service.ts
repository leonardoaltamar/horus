import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './../../core/models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}person`;
  }

  getAll() {
    return this.http.get<Person[]>(`${this.endPoint}`);
  }

  getById(id: number) {
    return this.http.get<Person>(`${this.endPoint}/${id}`);
  }

  getByDocument(document: number) {
    return this.http.get<Person>(`${this.endPoint}/by_document/${document}`)
  }

  create(person: Person) {
    return this.http.post<Person>(`${this.endPoint}`, person);
  }

  update(id: number, person: Person) {
    return this.http.patch(`${this.endPoint}/${id}`, person)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, person: Person) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: person
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }
}
