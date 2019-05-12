import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MyService } from './service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends MyService{

  loggedIn = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient,private router: Router,) { super() }

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  logout() {
        // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('permissions');
    this.loggedIn.next(false);
    this.router.navigate(["admin/login"]);
  }

}