import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Permission } from './../models/permission.model';
import { Section } from './../models/section.model';

@Injectable({ providedIn: 'root' })

export class PermissionService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}permission`;
  }

  create(permission: Permission) {
    return this.http.post<Permission>(`${this.endPoint}`, permission);
  }

  getAll() {
    return this.http.get<Permission[]>(`${this.endPoint}`).toPromise();
  }


  getById(id: string) {
    return this.http.get<Permission>(`${this.endPoint}/${id}`).toPromise();
  }

  getByUserType(id: string) {
    return this.http.get<Section[]>(`${this.endPoint}/userType/${id}`).toPromise();
  }

  update(id, params) {
    return this.http.put(`${this.endPoint}/${id}`, params)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${this.endPoint}/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }
}
