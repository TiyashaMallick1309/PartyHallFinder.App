import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { SlotService } from 'src/app/services/slot.service';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { PartyHallService } from 'src/app/services/party-hall.service';
import { PartyHall } from 'src/app/models/party-hall';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.css']
})

export class AdminBookingComponent implements OnInit {
  bookings: Booking[] = [];
   users: User[] = [];

  constructor(private partyHallService: PartyHallService, private slotService: SlotService, private apiService: ApiService) { }

    ngOnInit(): void {
      this.partyHallService.getPartyHalls().subscribe({
        next: (partyHalls: PartyHall[]) => {
          this.bookings.forEach(booking => {
            let partyHall = partyHalls.find(partyHall => partyHall.id == booking.partyHallId);
            if (partyHall) { booking.partyHallId = partyHall.name; }
          });
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    
      this.slotService.getSlots().subscribe({
        next: (bookings: Booking[]) => {
          this.bookings = bookings;
          console.log(this.bookings)
          this.apiService.getUsers().subscribe({
            next: (users: User[]) => {
              this.users = users;
              console.log(this.users);
              this.bookings.forEach(booking => {
                let user = this.users.find(user => user.id == booking.userId);
                console.log(user);
                if (user) { booking.userId = user.firstName + ' ' + user.lastName; }
              });
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }