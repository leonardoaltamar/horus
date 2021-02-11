import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { SessionService } from './../../core/services/session.service';
import { User } from './../models/user.model';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private sessionService: SessionService, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user")));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  async singIn(username: string, password: string) {
    const user = await this.http.post<User>(`${environment.apiUrl}auth/signin`, { username, password }).toPromise()
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
    return user;
  }

  logout() {
    // remove user from local storage and set current user to null
    this.userSubject.next(null);
    localStorage.removeItem("user");
    this.sessionService.removeItem("currentUser");
    this.sessionService.clear();
    this.router.navigate(['/login']);
  }
}
