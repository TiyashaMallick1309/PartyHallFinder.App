import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { PartyHallListingComponent } from './components/party-hall-listing/party-hall-listing.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';

const routes: Routes = [
  { path: "", component: RegisterLoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent,
  children: [
    { path: 'user-history', component: UserHistoryComponent },
    { path: 'party-hall-list', component: PartyHallListingComponent },
  ]},
  { path: 'owner-dashboard', component: OwnerDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
