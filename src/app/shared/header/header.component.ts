import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/model/user';
import { Role } from 'src/app/model/role';
import { ChangePasswordComponent } from '../forms/change-password/change-password.component';
import { AuthService } from '../../service/auth.service';
import { Apollo } from 'apollo-angular';
import { ServiceGQl } from 'src/app/service/graphql';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string;
  password: string;

  currentUser:User;
  
  roles:Role[] = [];
  visible:boolean = false; 

  constructor(public dialog: MatDialog,private apollo: Apollo) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || new User();
    if (this.currentUser ) {
      this.username = this.currentUser.username;
    }

    if ( this.currentUser.roles ){
      this.roles = this.currentUser.roles['rows'];
    }else{
      this.roles.push(new Role());
    }
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      data: {username: this.username, password: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
    });
  }

  logout(): void {
    this.apollo.mutate({
      mutation: ServiceGQl.logoutGQL,
      variables: {
        username: this.username,
      },
    }).subscribe((data) => {
      localStorage.clear();
      localStorage.setItem('currentUser', "");
      localStorage.setItem('currentToken', "");
      localStorage.setItem('permissions', "");
      location.href = "admin/login"; 
    },(error) => {
      console.log("error", error)
    });
  }
  
}


