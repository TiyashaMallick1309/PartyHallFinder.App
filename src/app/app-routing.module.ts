import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { PartyHallListingComponent } from './components/party-hall-listing/party-hall-listing.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { OwnerDetailsComponent } from './components/owner-details/owner-details.component';
import { AdminOwnersComponent } from './components/admin-owners/admin-owners.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { PartyHallDetailsComponent } from './components/party-hall-details/party-hall-details.component';
import { SavedHallsComponent } from './components/saved-halls/saved-halls.component';
import { HelpComponent } from './components/help/help.component';
import { UploadHallsComponent } from './components/upload-halls/upload-halls.component';
import { UpdateHallsComponent } from './components/update-halls/update-halls.component';
import { BookingComponent } from './components/booking/booking.component';
import { ReviewComponent } from './components/review/review.component';
import { ReviewRatingComponent } from './components/review-rating/review-rating.component';
import { AdminBookingComponent } from './components/admin-booking/admin-booking.component';
import { authGuard } from './Guard/auth.guard';
import { CanActivateFn } from '@angular/router';


const routes: Routes = [
  { path: "", component: RegisterLoginComponent },
  //User
  {
    path: 'user-dashboard', component: UserDashboardComponent,
    // canActivate:[authGuard],
    children: [
      {
        path: 'user-history', component: UserHistoryComponent,
        children: [
          { path: 'review', component: ReviewComponent }
        ]
      },
      { path: 'help', component: HelpComponent },
      { path: 'party-hall-list', component: PartyHallListingComponent,canActivate: [authGuard] },
      { path: 'saved', component: SavedHallsComponent },
      {
        path: 'party-hall-list/:id', component: PartyHallDetailsComponent,
        children: [
          { path: 'book', component: BookingComponent },
          {path:'rating',component:ReviewRatingComponent}
        ]
      },
    ]
  },
  //Owner
  {
    path: 'owner-dashboard', component: OwnerDashboardComponent,
    canActivate:[authGuard],
    children: [
      {
        path: 'owner-details', component: OwnerDetailsComponent,canActivate: [authGuard],
        children: [
          { path: 'update', component: UpdateHallsComponent }
        ]
      },
      { path: 'upload', component: UploadHallsComponent }

    ]
  },
  //Admin
  {
    path: 'admin-dashboard', component: AdminDashboardComponent,
    canActivate:[authGuard],
    children: [
      { path: 'admin-owners', component: AdminOwnersComponent },
      { path: 'admin-booking', component: AdminBookingComponent,canActivate: [authGuard] },
      { path: 'admin-users', component: AdminUsersComponent },
      //bookings
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: 'canActivateTeam',
      useValue: authGuard
    }
]
})
export class AppRoutingModule { }
