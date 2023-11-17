import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { PartyHallListingComponent } from './components/party-hall-listing/party-hall-listing.component';
import { PartyHallDetailsComponent } from './components/party-hall-details/party-hall-details.component';
import { PartyHallBookingComponent } from './components/party-hall-booking/party-hall-booking.component';
import { ReviewRatingComponent } from './components/review-rating/review-rating.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OwnerLoginComponent } from './components/owner-login/owner-login.component';
import { OwnerRegisterComponent } from './components/owner-register/owner-register.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { OwnerDetailsComponent } from './components/owner-details/owner-details.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminOwnersComponent } from './components/admin-owners/admin-owners.component';
import { SavedHallsComponent } from './components/saved-halls/saved-halls.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    PartyHallListingComponent,
    PartyHallDetailsComponent,
    PartyHallBookingComponent,
    ReviewRatingComponent,
    RegisterLoginComponent,
    OwnerDashboardComponent,
    AdminDashboardComponent,
    UserHistoryComponent,
    RegisterComponent,
    LoginComponent,
    OwnerLoginComponent,
    OwnerRegisterComponent,
    AdminLoginComponent,
    OwnerDetailsComponent,
    AdminUsersComponent,
    AdminOwnersComponent,
    SavedHallsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
