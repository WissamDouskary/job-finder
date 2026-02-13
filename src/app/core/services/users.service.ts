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
    let userJson = localStorage.getItem("user");
    if (!userJson) {
      userJson = sessionStorage.getItem("user");
    }
    return userJson ? JSON.parse(userJson) : null;
  }

  saveUser(user: userResponse, rememberMe: boolean): void {
    const userJson = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem('user', userJson);
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('user', userJson);
      localStorage.removeItem('user');
    }
  }

  login(payload: Login, rememberMe: boolean = false): Observable<userResponse | boolean> {
    return this.getAllUsers().pipe(
      map((users: user[]) => {
        if (users.length === 0) {
          return false;
        }
        return users.find(u => u.email === payload.email && u.password === payload.password) as userResponse || false;
      })
    );
  }

  logOut() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("user") || !!sessionStorage.getItem("user");
  }
}
