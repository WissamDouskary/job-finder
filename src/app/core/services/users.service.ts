import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { envVariables } from '../../../env/env-variables';
import { user } from '../models/user.model';
import { userResponse } from '../models/user-response.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private URL = envVariables.API_URL;
  private _httpClient = inject(HttpClient);

  register(body: user): Observable<user> {
    return this._httpClient.post<user>(`${this.URL}/users`, body);
  }

  getAllUsers(): Observable<user[]> {
    return this._httpClient.get<user[]>(`${this.URL}/users`);
  }

  updateUser(user: user): Observable<user> {
    return this._httpClient.put<user>(`${this.URL}/users/${user.id}`, user);
  }

  getCurrentUser(): user | null {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  }

  login(payload: Login): Observable<user | boolean> {
    return this.getAllUsers().pipe(
      map((users: user[]) => {
        if (users.length === 0) {
          return false;
        }
        return users.find(u => u.email === payload.email && u.password === payload.password) || false;
      })
    );
  }

  logOut() {
    localStorage.removeItem("user");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("user");
  }
}
