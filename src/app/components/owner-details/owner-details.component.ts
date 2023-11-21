import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { PartyHall } from 'src/app/models/party-hall';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  phonenumber: string = '';
  id: string = '';
  partyHalls: PartyHall[] = [];
  selectedPartyHall: PartyHall | undefined;
  private currentOwner: any;
  confirmDelete: boolean = false;
  deleteHallId: string = '';

  // Array to hold all the party halls owned by the current owner
  currentPartyHalls: PartyHall[] = [];

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    public partyHallService: PartyHallService
  ) { }

  ngOnInit() {
    this.currentOwner = JSON.parse(localStorage.getItem('currentOwner') || '{}');
    if (this.currentOwner && this.currentOwner.id) {
      this.authService.isAuthenticatedSubject.next(true);
      this.authService.IdSubject.next(this.currentOwner.id);
      this.id = this.currentOwner.id; // Add this line to update the id value
      this.authService.EmailSubject.next(this.currentOwner.email);
      this.authService.phonenumberSubject.next(this.currentOwner.phonenumber || '');
      this.authService.firstNameSubject.next(this.currentOwner.firstName);
      this.authService.lastNameSubject.next(this.currentOwner.lastName);
      this.authService.nameSubject.next(this.currentOwner.username);
      this.authService.TypeSubject.next(this.currentOwner.role);
    }
    this.authService.isAuthenticatedSubject.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.authService.firstNameSubject.subscribe(firstName => {
          this.firstName = firstName;
          console.log("first: ", firstName)
        });
        this.authService.nameSubject.subscribe(username => {
          this.username = username;
          console.log(username, " username")
        });
        this.authService.lastNameSubject.subscribe(lastName => {
          this.lastName = lastName;
          console.log("lastName: ", lastName)
        });
        this.authService.EmailSubject.subscribe(email => {
          this.email = email;
        });
        this.authService.phonenumberSubject.subscribe(phonenumber => {
          this.phonenumber = phonenumber;
        });
      }
    });
    // Get all party halls
    this.partyHallService.getPartyHalls().subscribe((partyHalls: PartyHall[]) => {
      this.partyHalls = partyHalls;

      // Filter party halls by the current owner's id and store them in currentPartyHalls array
      this.currentPartyHalls = this.partyHalls.filter(partyHall => partyHall.ownerId == this.id);
      console.log(this.currentPartyHalls);
    });
  }

  openPartyHallDetails(partyHall: PartyHall) {
    if (partyHall && partyHall.id) {
      this.router.navigate(['party-hall-list', partyHall.id]);
    }
  }

  handleImageError(event: Event): void {
    console.error('Image error: ', event);
  }

  getHallId(currentPartyHall: PartyHall): void {
    this.selectedPartyHall = currentPartyHall;
    console.log('Selected party hall:', this.selectedPartyHall);
    this.partyHallService.setSelectedPartyHall(this.selectedPartyHall);
    this.router.navigate(['owner-dashboard', 'owner-details', 'update']);
  }

  openPartyHall(partyHall: PartyHall) {
    console.log(partyHall);
    if (partyHall && partyHall.id) {
      this.router.navigate(['/owner-dashboard/owner-details/manage-hall']);
    }
  }

  setDeleteBooking(hallId: string) {
    this.deleteHallId = hallId;
    this.confirmDelete = true;
    console.log(this.deleteHallId)
  }

  deleteHall() {
    this.partyHallService.deletePartyHall(this.deleteHallId).subscribe(() => {
      console.log(this.partyHalls)
      this.partyHalls = this.partyHalls.filter(
        (partyHall: PartyHall) => partyHall.id !== this.deleteHallId
      );
    });
    this.confirmDelete = false;
    window.location.reload();
  }

  cancelDelete() {
    this.confirmDelete = false;
  }
}