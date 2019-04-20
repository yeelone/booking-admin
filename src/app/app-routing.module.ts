import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/injectable/authguard';

const routes: Routes = [
  { path: 'users', loadChildren: './pages/user/user.module#UserModule', canActivate: [AuthGuard]},
  { path: 'org', loadChildren: './pages/group/group.module#GroupModule', canActivate: [AuthGuard]},
  { path: 'role', loadChildren: './pages/role/role.module#RoleModule', canActivate: [AuthGuard]},
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  { path: 'login', component : LoginComponent },
  { path : '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule',  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
