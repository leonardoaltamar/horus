import { Setting } from './../models/setting.model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}setting`;
  }

  getById(id: string) {
    return this.http.get<Setting>(`${this.endPoint}/${id}`).toPromise();
  }

  get() {
    return this.http.get<Setting>(`${this.endPoint}`).toPromise();
  }

  create(setting: Setting) {
    return this.http.post<Setting>(`${this.endPoint}`, setting);
  }

  update(id: number, setting: Setting) {
    return this.http.patch(`${this.endPoint}/${id}`, setting)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, setting: Setting) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: setting
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }
}
