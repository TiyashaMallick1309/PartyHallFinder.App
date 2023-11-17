import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-saved-halls',
  templateUrl: './saved-halls.component.html',
  styleUrls: ['./saved-halls.component.css']
})
export class SavedHallsComponent {
  partyHall : any[] = []; // Declare an empty array to store wishlist items

  constructor(public partyHallService : PartyHallService, private auth: AuthorizationService, private router: Router) {}

  ngOnInit() {
      this.partyHall = this.partyHallService.getsavedHalls(); // Retrieve the wishlist items from the wishlist service
  }

  // Call the removeFromWishlist function
  removeFromWishlist(item : any) {
      this.partyHallService.removeFromSaved(item);
      alert("Item removed from wishlist");
  }

  // Method to clear the entire wishlist
  clearWishlist() {
      this.partyHallService.clearsavedHalls();
      this.partyHall = [];
  }

  logout(){
    this.auth.isAuthenticatedSubject.next(false);
    this.auth.TypeSubject.next('');
    this.auth.nameSubject.next('');
    this.router.navigate(['/'])
  }

}