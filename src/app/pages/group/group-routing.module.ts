import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';
import { UserComponent } from './user/user.component';
import { CanteenComponent } from './canteen/canteen.component';

const routes: Routes = [
  { path: '', component: GroupComponent,},
  { path: ':id/users', component : UserComponent },
  { path: ':id/canteens', component : CanteenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {
}