import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from './entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    private userCache: IUser;


    public signIn(email: string, password: string): Observable<string> {
        return this.http.post<{ token: string }>(`/auth/signin`, { email, password })
        .pipe(map(res => {
            localStorage.setItem('token', res.token);
            return res.token;
        }))
    }

    public signOut(): Observable<void> {
        localStorage.removeItem('token');
        return new Observable(subscriber => {
            subscriber.next();
            subscriber.complete();
        });
    }

    public getLoggedUser(): Observable<IUser> {
        if (this.userCache) {
            return new Observable(subscriber => {
                subscriber.next(this.userCache);
                subscriber.complete();
            });
        }
        return this.http.get<IUser>(`/users/current-user`)
        .pipe(map(user => {
            this.userCache = user;
            return user;
        }))
    }

}
