import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-saved-halls',
  templateUrl: './saved-halls.component.html',
  styleUrls: ['./saved-halls.component.css']
})
export class SavedHallsComponent {
  user: any;
  savedHalls: any[] = [];

  constructor(public partyHallService: PartyHallService, private auth: AuthorizationService, private router: Router) { }

  ngOnInit() {
    // Retrieve the saved halls passed as a state parameter and store it in the savedHalls variable
  this.savedHalls = (history.state && history.state.savedHalls) || JSON.parse(localStorage.getItem('savedHalls') || '[]');
  console.log('Retrieved saved halls:', this.savedHalls);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log("current user: ",JSON.parse(localStorage.getItem('currentUser') || '{}'))
    if (!currentUser || !currentUser.id) {
      this.router.navigate(['/']);
    } else {
      this.user = currentUser;
    }
  }

  // Call the removeSavedHall function
removeSavedHall(savedHall: any) {
  // Remove the selected party hall from the savedHalls list
  const index = this.savedHalls.indexOf(savedHall);
  if (index > -1) {
      this.savedHalls.splice(index, 1);
      console.log('Party Hall removed from saved halls:', this.savedHalls);
  }

   // Update the savedHalls list in local storage
  localStorage.setItem('savedHalls', JSON.stringify(this.savedHalls));
  console.log('Saved halls updated in local storage:', JSON.parse(localStorage.getItem('savedHalls') || '[]'));

  // Display a success message
  alert('The party hall has been removed from your list.');
}

  // Method to clear the entire saved list
clearSavedHalls() {
  // Clear the savedHalls list
  this.savedHalls = [];
  console.log('Saved halls cleared:', this.savedHalls);

  // Update the savedHalls list in local storage
  localStorage.setItem('savedHalls', JSON.stringify(this.savedHalls));
  console.log('Saved halls updated in local storage:', JSON.parse(localStorage.getItem('savedHalls') || '[]'));
}

  logout() {
    this.auth.isAuthenticatedSubject.next(false);
    this.auth.TypeSubject.next('');
    this.auth.nameSubject.next('');
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
    this.user = undefined;
    this.router.navigate(['/']);
  }

}