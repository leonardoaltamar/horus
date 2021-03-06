import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Process } from './../models/process.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}process`;
  }

  getAll() {
    return this.http.get<Process[]>(`${this.endPoint}`).toPromise();
  }

  getAllByYear(type: string) {
    return this.http.get<Process[]>(`${this.endPoint}/year/${type}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Process>(`${this.endPoint}/${id}`).toPromise();
  }

  create(process: Process) {
    return this.http.post<Process>(`${this.endPoint}`, process);
  }

  update(id: number, process: Process) {
    return this.http.patch(`${this.endPoint}/${id}`, process)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, process: Process) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: process
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }
}
