import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { envVariables } from '../../../env/env-variables';
import { Suivi, SuiviStatus } from '../models/suivi.model';

@Injectable({ providedIn: 'root' })
export class SuiviService {
  private _http = inject(HttpClient);
  private API_URL = envVariables.API_URL;

  getAllSuivis(userId: string): Observable<Suivi[]> {
    return this._http.get<Suivi[]>(`${this.API_URL}/suivi?userId=${userId}`);
  }

  addSuivi(body: Suivi): Observable<Suivi> {
    return this._http.post<Suivi>(`${this.API_URL}/suivi`, body);
  }

  deleteSuivi(id: string): Observable<void> {
    return this._http.delete<void>(`${this.API_URL}/suivi/${id}`);
  }

  updateSuiviStatus(id: string, status: SuiviStatus): Observable<Suivi> {
    return this._http.patch<Suivi>(`${this.API_URL}/suivi/${id}`, { status });
  }

  updateSuiviNotes(id: string, notes: string): Observable<Suivi> {
    return this._http.patch<Suivi>(`${this.API_URL}/suivi/${id}`, { notes });
  }
}
