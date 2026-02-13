import { inject, Injectable } from '@angular/core';
import { envVariables } from '../../../env/env-variables';
import { Favorite } from '../models/favorite.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { userResponse } from '../models/user-response.model';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private _http = inject(HttpClient);
  private API_URL = envVariables.API_URL;

  saveFavorites(body: Favorite): Observable<Favorite> {
    return this._http.post<Favorite>(`${this.API_URL}/favorits`, body);
  }

  getAllFavorites(userId: string): Observable<Favorite[]> {
    return this._http.get<Favorite[]>(`${this.API_URL}/favorits?userId=${userId}`);
  }

  deleteFavorite(id: string): Observable<void> {
    return this._http.delete<void>(`${this.API_URL}/favorits/${id}`);
  }
}
