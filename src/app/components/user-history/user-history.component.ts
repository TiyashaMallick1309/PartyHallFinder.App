import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ApiService } from 'src/app/services/api.service';
import { filter } from 'rxjs';
import { SlotService } from 'src/app/services/slot.service';
import { Booking } from 'src/app/models/booking';
import { PartyHallService } from 'src/app/services/party-hall.service';
import { PartyHall } from 'src/app/models/party-hall';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  name!: string;
  email!: string;
  phonenumber: string = '';
  address: Address[] = [];
  matchingHalls: PartyHall[] = [];

  constructor(public partyHallService: PartyHallService,private slotService: SlotService, private authService: AuthorizationService, private apiService: ApiService) { }

  ngOnInit() {
    this.authService.isAuthenticatedSubject.pipe(filter(isAuthenticated => isAuthenticated)).subscribe(() => {
      this.authService.nameSubject.subscribe(name => {
        // console.log('name: ', name); 
        this.name = name;
      });
      this.authService.EmailSubject.subscribe(email => {
        // console.log('email: ', email); 
        this.email = email;
      });
      this.authService.PhoneNumberSubject.subscribe(phonenumber => {
        // console.log('phonenumber: ', phonenumber );
        this.phonenumber = phonenumber;
      });
      this.authService.AddressSubject.subscribe(address => {
        this.address = address;
      });
    });
    this.slotService.getSlots().subscribe(slots => {
      const userBookings = slots.filter(slot => slot.userId === this.slotService.userId);
      const hallIds = userBookings.map(booking => booking.partyHallId);
      console.log(hallIds);
    
      this.partyHallService.getPartyHalls().subscribe(halls => {
        this.matchingHalls = halls.filter(hall => hallIds.includes(hall.id));
        console.log(this.matchingHalls);
      });
    });
  }

  handleImageError(event: Event): void {
    console.error('Image error: ', event);
  }
}