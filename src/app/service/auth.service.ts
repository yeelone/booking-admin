import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, } from 'rxjs';
import { MyService } from './service';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends MyService{

  private loggedIn = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient,private router: Router,) { super() }

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  login(u:User): Observable<Response[]> {
    let url = '/api/login';
    let data = {
      username: u.username, 
      password: u.password
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => {
            if ( response['code'] === 200  ) {
              let currentUser:User = new User();
              currentUser = response['data']['user'];
              currentUser.token = response['data']['token'];
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              this.log('login success');
              this.loggedIn.next(true);
            }else{
              this.handleError('login', [])
              console.log("login error", response);
              this.loggedIn.next(false);
            }
        } ),
        catchError(this.handleError('login', []))
    );
  }

  logout() {
        // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('permissions');
    this.loggedIn.next(false);
    this.router.navigate(["login"]);
  }

}