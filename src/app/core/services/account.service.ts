import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Account } from './../models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}account`;
  }

  getAll() {
    return this.http.get<Account[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<Account>(`${this.endPoint}/${id}`).toPromise();
  }

  create(account: Account) {
    return this.http.post<Account>(`${this.endPoint}`, account);
  }

  update(id: number, account: Account) {
    return this.http.patch(`${this.endPoint}/${id}`, account).pipe(
      map((x) => {
        return x;
      })
    );
  }

  delete(id: number, account: Account) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: account,
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions).pipe(
      map((x) => {
        return x;
      })
    );
  }
}
