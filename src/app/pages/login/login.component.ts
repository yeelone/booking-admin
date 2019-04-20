import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MatSnackBar } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { ServiceGQl } from '../../service/graphql';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService:AuthService,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) { }
  username: string;
  password: string;
  returnUrl: string;

  ngOnInit() {
    // // reset login status
    this.authService.logout();

    // // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  
  login() : void {
    this.apollo.mutate({
      mutation: ServiceGQl.loginGQL,
      variables: {
        username: this.username,
        password: this.password
      },
    }).subscribe((data) => {
      let currentUser:User = new User();
      currentUser = data['data']['login']['user'];
      currentUser.token = data['data']['login']['token'];
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('currentToken', currentUser.token);
      localStorage.setItem('permissions', data['data']['login']['permissions']);
      this.snackBar.open("登录成功!", "🍕 🍕 🍕", {
        duration: 1000,
      });
      location.href = this.returnUrl; 
    },(error) => {
      console.log("error", error)
      this.snackBar.open("登录失败...", "🤢🤢🤢", {
        duration: 5000,
      });
      
    });

  }
}