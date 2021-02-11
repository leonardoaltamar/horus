import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { OptPerm } from './../../core/models/optPerm.model';
@Injectable({
  providedIn: 'root'
})
export class OptionPermissionService {

  private endPoint: string;
  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}option_permission`;
  }

  delete(id: number, optPerm: OptPerm) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: optPerm
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));

  }
}
