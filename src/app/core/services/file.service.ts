import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SessionService } from '@core/services/session.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private endPoint: string;
  private currentUser: User;
  constructor(private http: HttpClient, private servieSession: SessionService) {
    this.endPoint = `${environment.apiUrlFile}`;
    this.currentUser = this.servieSession.getItem("currentUser");
  }

  async uploadFile(fileData: File) {
    const formData = new FormData();
    formData.append('file', fileData);

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.currentUser.token, enctype: 'multipart/form-data'}),
    };

    return await this.http.post(`${this.endPoint}upload`, formData, httpOptions).toPromise();
  }

  async deleteFile(url: string){
    const name = url.split('/')[4];
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.currentUser.token, enctype: 'multipart/form-data'}),
    };
    return await this.http.delete(`${this.endPoint}file/${name}`, httpOptions).toPromise();
  }
}
