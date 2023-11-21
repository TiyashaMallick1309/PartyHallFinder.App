import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  partyHalls: any[] = [];
  user!: User;
  savedHalls: any[] = [];

  constructor(private router: Router, private auth: AuthorizationService, private partyHallService: PartyHallService) { }

  ngOnInit() {
    // Navigate to party hall list
    this.router.navigate(['user-dashboard/party-hall-list']);

    // Retrieve user data from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.id) {
      // Initialize component properties with user data
      this.user = currentUser;

      // (optional) log the user data
      console.log('User data in UserDashboardComponent', this.user);
    }

    // Call the method to get the saved halls
    this.getSavedHalls();
  }

  getSavedHalls() {
    this.savedHalls = this.partyHallService.savedHalls;
    console.log('Retrieved saved halls:', this.savedHalls);
  }

  logout() {
    this.auth.isAuthenticatedSubject.next(false);
    this.auth.TypeSubject.next('');
    this.auth.nameSubject.next('');
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/']);
  }

 savedList() {
  // Navigate to the saved halls list component and pass the saved halls from the service
  this.router.navigate(['user-dashboard/saved'], { state: { savedHalls: this.partyHallService.savedHalls } });
}



}
