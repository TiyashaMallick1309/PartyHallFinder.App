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
  deleteBookingId: string = '';
  confirmDelete: boolean = false;

  constructor(
    private partyHallService: PartyHallService,
    private slotService: SlotService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.partyHallService
      .getPartyHalls()
      .subscribe((partyHalls: PartyHall[]) => {
        this.slotService.getSlots().subscribe((bookings: Booking[]) => {
          this.apiService.getUsers().subscribe((users: User[]) => {
            for (let booking of bookings) {
              for (let user of users) {
                if (booking.userId == user.id) {
                  booking.userId = user.firstName + ' ' + user.lastName;
                  break;
                }
              }
              for (let partyHall of partyHalls) {
                if (booking.partyHallId === partyHall.id) {
                  booking.partyHallId = partyHall.name;
                  break;
                }
              }
            }
            this.bookings = bookings;
          });
        });
      });
  }

  setDeleteBooking(bookingId: string) {
    this.deleteBookingId = bookingId;
    this.confirmDelete = true;
  }

  deleteBooking() {
    this.slotService.deleteBooking(this.deleteBookingId).subscribe(() => {
      this.bookings = this.bookings.filter(
        (booking: Booking) => booking.id !== this.deleteBookingId
      );
    });
    this.confirmDelete = false;
    window.location.reload();
  }

  cancelDelete() {
    this.confirmDelete = false;
  }
}