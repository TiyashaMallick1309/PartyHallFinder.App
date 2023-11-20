import { Component, OnInit } from '@angular/core';
import { Address, User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ApiService } from 'src/app/services/api.service';
import { SlotService } from 'src/app/services/slot.service';
import { PartyHallService } from 'src/app/services/party-hall.service';
import { PartyHall } from 'src/app/models/party-hall';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  userName!: string;
  firstName!: string;
  lastName!: string;
  id!:string;
  email!: string;
  phonenumber: string = '';
  address: Address[] = [];
  matchingHalls: PartyHall[] = [];
  user!: User;
  role!: string;
  private currentUser: any;

  constructor(private router:Router,public partyHallService: PartyHallService,private slotService: SlotService, private authService: AuthorizationService, private apiService: ApiService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (this.currentUser && this.currentUser.id) {
      this.authService.isAuthenticatedSubject.next(true);
      this.authService.IdSubject.next(this.currentUser.id);
      this.authService.EmailSubject.next(this.currentUser.email);
      this.authService.phonenumberSubject.next(this.currentUser.phonenumber || '');
      const addressDetails: Address = {
        street: this.currentUser?.address?.street || '',
        city: this.currentUser?.address?.city || '',
        state: this.currentUser?.address?.state || '',
        country: this.currentUser?.address?.country || '',
        postalcode: this.currentUser?.address?.postalcode || ''
      };
      const address: Address[] = [addressDetails];
      this.authService.AddressSubject.next(address);
      this.authService.firstNameSubject.next(this.currentUser.firstName);
      this.authService.lastNameSubject.next(this.currentUser.lastName);
      this.authService.nameSubject.next(this.currentUser.userName);
      this.authService.TypeSubject.next(this.currentUser.role);
    }
    this.authService.isAuthenticatedSubject.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.authService.firstNameSubject.subscribe(firstName => {
          this.firstName = firstName;
        });
        this.authService.nameSubject.subscribe(userName => {
          this.userName = userName;
        });
        this.authService.lastNameSubject.subscribe(lastName => {
          this.lastName = lastName;
        });
        this.authService.EmailSubject.subscribe(email => {
          this.email = email;
        });
        this.authService.phonenumberSubject.subscribe(phonenumber => {
          this.phonenumber = phonenumber;
        });
        this.authService.AddressSubject.subscribe(address => {
          this.address = address;
        });
      }
    });
    this.slotService.getSlots().subscribe(slots => {
      const userId = this.authService.IdSubject.value;
      console.log('UserHistoryComponent: userId=', userId);
      const userBookings = slots.filter(slot => slot.userId === userId);
      console.log('UserHistoryComponent: userBookings=', userBookings);
      const hallIds = userBookings.map(booking => booking.partyHallId);
      console.log('UserHistoryComponent: hallIds=', hallIds);
      this.partyHallService.getPartyHalls().subscribe(halls => {
        console.log('UserHistoryComponent: halls=', halls);
        this.matchingHalls = halls.filter(hall => hallIds.includes(hall.id));
        console.log('UserHistoryComponent: matchingHalls=', this.matchingHalls);
      });
    });
     }

  handleImageError(event: Event): void {
    console.error('Image error: ', event);
  }

  Rating(){
    this.router.navigate(['user-dashboard/user-history/review'])
  }
}