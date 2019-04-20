import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'booking-admin';
  isLoggedIn$: Observable<boolean>;
  isLoggedIn:boolean = false;
  showSidenav:boolean = true ; 

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("Power by Jiangyilong 2019");
    this.isLoggedIn$ = this.authService.isLoggedIn;

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }

    this.showSidenav = this.isLoggedIn;
    this.isLoggedIn$.subscribe((resp)=>{
        this.isLoggedIn = resp;   
        this.showSidenav = this.isLoggedIn;
    })
  }

  toggle():void{
    this.showSidenav = !this.showSidenav;    
  }

}
