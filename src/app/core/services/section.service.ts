import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Section } from './../../core/models/section.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private endPoint: string;
  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}section`;
  }

  getAll() {
    return this.http.get<Section[]>(`${this.endPoint}`).toPromise();
  }

  getWhole() {
    return this.http.get<Section[]>(`${this.endPoint + '/whole'}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Section>(`${this.endPoint}/${id}`).toPromise();
  }

  create(section: Section) {
    return this.http.post<Section>(`${this.endPoint}`, section);
  }

  update(id: number, section: Section) {
    return this.http.patch(`${this.endPoint}/${id}`, section);
    // .pipe(map(x => {
    //   return x;
    // }));
  }

  delete(id: number) {
    return this.http.delete(`${this.endPoint}/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }
}
