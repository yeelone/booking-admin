import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/injectable/authguard';

const routes: Routes = [
  { path: 'admin/users', loadChildren: './pages/user/user.module#UserModule', canActivate: [AuthGuard]},
  { path: 'admin/org', loadChildren: './pages/group/group.module#GroupModule', canActivate: [AuthGuard]},
  { path: 'admin/role', loadChildren: './pages/role/role.module#RoleModule', canActivate: [AuthGuard]},
  { path: 'admin/config', loadChildren: './pages/config/config.module#ConfigModule', canActivate: [AuthGuard]},
  { path: 'admin/report', loadChildren: './pages/report/report.module#ReportModule', canActivate: [AuthGuard]},
  { path: 'admin/dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  { path: 'admin/login', component : LoginComponent },
  { path : '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule',  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
