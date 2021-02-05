import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Category } from './../models/category.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}category`;
  }

  getAll() {
    return this.http.get<Category[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Category>(`${this.endPoint}/${id}`).toPromise();
  }

  create(category: Category) {
    return this.http.post<Category>(`${this.endPoint}`, category);
  }

  update(id: number, category: Category) {
    return this.http.patch(`${this.endPoint}/${id}`, category)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number,category:Category) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: category
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}


