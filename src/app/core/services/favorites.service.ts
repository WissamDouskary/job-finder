import { inject, Injectable } from "@angular/core";
import { envVariables } from "../../../env/env-variables";
import { Favorite } from "../models/favorite.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class FavoriteService {
    private _http = inject(HttpClient);
    private API_URL = envVariables.API_URL;

    saveFavorites(body: Favorite): Observable<Favorite>{
        return this._http.post<Favorite>(`${this.API_URL}/favorits`, body)
    }
}