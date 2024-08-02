import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }


    public signIn(email: string, password: string): Observable<string> {
        return this.http.post<{ token: string }>(`/auth/signin`, { email, password })
        .pipe(map(res => {
            localStorage.setItem('token', res.token);
            return res.token;
        }))
    }

    public getLoggedUser(): Observable<string> {
        return this.http.get<string>(`/users/current-user`);
    }

}
