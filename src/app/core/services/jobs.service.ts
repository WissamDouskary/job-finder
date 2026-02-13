import { inject, Injectable } from "@angular/core";
import { envVariables } from "../../../env/env-variables";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { job } from "../models/job.model";
import { jobResponse } from "../models/job-resp.model";

@Injectable({ providedIn: "root" })
export class jobService {
  private _httpClient = inject(HttpClient);
  private API_THEMUSE = envVariables.API_THEMUSE;

  getAllJobs(page?: number, category?: string, location?: string): Observable<jobResponse> {
    let params = new HttpParams();

    if (page !== undefined) {
      params = params.set('page', page);
    }

    if (category) {
      params = params.set('category', category);
    }

    if (location) {
      params = params.set('location', location);
    }

    return this._httpClient.get<jobResponse>(`${this.API_THEMUSE}/jobs`, { params });
  }

  getJobById(id: number): Observable<job> {
    return this._httpClient.get<job>(`${this.API_THEMUSE}/jobs/${id}`);
  }
}