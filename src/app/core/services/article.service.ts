import { Article } from './../models/article.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}article`;
  }

  async getAll() {
    return this.http.get<Article[]>(`${this.endPoint}`).toPromise();
  }

  async getTop() {
    return this.http.get<Article[]>(`${this.endPoint}/topArticle`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Article>(`${this.endPoint}/${id}`).toPromise();
  }

  create(article: Article) {
    return this.http.post<Article>(`${this.endPoint}`, article);
  }

  update(id: number, article: Article) {
    return this.http.patch(`${this.endPoint}/${id}`, article);
    // .pipe(map(x => {
    //   return x;
    // }));
  }

  delete(id: number, article: Article) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: article
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
