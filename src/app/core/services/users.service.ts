import { Observable } from "rxjs";
import { envVariables } from "../../../env/env-variables";
import { user } from "../models/user.model";
import { userResponse } from "../models/user-response.model";
import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Login } from "../models/login.model";

@Injectable({providedIn: "root"})
export class UserService {
    private URL = envVariables.API_URL;
    private _httpClient = inject(HttpClient);

    register(body: user): Observable<userResponse>{
        return this._httpClient.post<user>(`${this.URL}/users`, body);
    }

    getAllUsers(): Observable<user[]>{
        return this._httpClient.get<user[]>(`${this.URL}/users`);
    }

    verifyPassword(payload: Login): boolean{
        const users = signal<user[]>([{
            nom: "",
            prenom: "",
            email: "",
            password: ""
        }]);

        this.getAllUsers().subscribe((resp: user[]) => users.set(resp))

        if(users.length == 0) {
            return false;
        }

        for(let u of users()){
            if(u.email == payload.email && u.password == payload.password){
                return true
            }else{
                return false;
            }
        }

        return false;
    }
}