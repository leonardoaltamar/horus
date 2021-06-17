import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessType } from './../models/processType.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ProcessTypeService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}process_type`;
  }

  getAll() {
    return this.http.get<ProcessType[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<ProcessType>(`${this.endPoint}/${id}`).toPromise();
  }

  getProcessTypeByCategory(categoryProcessId: string){
    return this.http.get<ProcessType[]>(`${this.endPoint}/processCategory/${categoryProcessId}`).toPromise();
  }

  create(processType: ProcessType) {
    return this.http.post<ProcessType>(`${this.endPoint}`, processType);
  }

  update(id: number, processType: ProcessType) {
    return this.http.patch(`${this.endPoint}/${id}`, processType)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, processType: ProcessType) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: processType
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
