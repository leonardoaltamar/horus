import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { User } from './../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endPoint: string;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.endPoint = `${environment.apiUrl}user`;
  }

  getAll() {
    return this.http.get<User[]>(`${this.endPoint}`).toPromise();
  }

  getById(id: string) {
    return this.http.get<User>(`${this.endPoint}/${id}`).toPromise();
  }

  getByUsername(username: string) {
    return this.http.get<User>(`${this.endPoint}/get_username/${username}`).toPromise();
  }

  create(user: User) {
    return this.http.post<User>(`${this.endPoint}`, user);
  }

  update(id, params) {
    return this.http.patch(`${this.endPoint}/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.authService.userValue.id) {
          // update local storage
          const user = { ...this.authService.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.authService.user.subscribe(x => x = user);
        }
        return x;
      }));
  }

  delete(id: number, user: User) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: user
    };
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.authService.userValue.id) {
          this.authService.logout();
        }
        return x;
      }));
  }

}
