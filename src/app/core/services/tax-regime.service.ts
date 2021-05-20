import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TaxRegime } from './../models/tax-regime.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class TaxRegimeService {

  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}tax_regime`;
  }

  getAll() {
    return this.http.get<TaxRegime[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<TaxRegime>(`${this.endPoint}/${id}`).toPromise();
  }

  create(taxRegime: TaxRegime) {
    return this.http.post<TaxRegime>(`${this.endPoint}`, taxRegime);
  }

  update(id: number, taxRegime: TaxRegime) {
    return this.http.patch(`${this.endPoint}/${id}`, taxRegime)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(id: number, taxRegime: TaxRegime) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: taxRegime
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        return x;
      }));
  }

}
