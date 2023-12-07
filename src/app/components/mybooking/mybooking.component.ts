import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { PartyHall } from 'src/app/models/party-hall';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';
import { SlotService } from 'src/app/services/slot.service';

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css']
})
export class MybookingComponent implements OnInit {
  private currentUser: any;
  matchingHalls: PartyHall[] = [];
  deleteBookingId: string = '';
  confirmDelete: boolean = false;
  userBookings: Booking[] = [];

  constructor(public partyHallService: PartyHallService, private slotService: SlotService, private authService: AuthorizationService, private apiService: ApiService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.slotService.getSlots().subscribe(slots => {
      const userId = this.authService.IdSubject.value;
      console.log('UserHistoryComponent: userId=', userId);
      this.userBookings = slots.filter(slot => slot.userId === userId)
      console.log('UserHistoryComponent: userBookings=', this.userBookings);
      const hallIds = this.userBookings.map(booking => booking.partyHallId);
      console.log('UserHistoryComponent: hallIds=', hallIds);
      this.partyHallService.getPartyHalls().subscribe(halls => {
        console.log('UserHistoryComponent: halls=', halls);
        this.matchingHalls = halls.filter(hall => hallIds.includes(hall.id));
        console.log('UserHistoryComponent: matchingHalls=', this.matchingHalls);
        // Using forEach() loop
        this.matchingHalls.forEach(hall => {
          console.log('Hall name:', hall.name);
        });

        // Using map() method
        const hallNames = this.matchingHalls.map(hall => hall.name);
        console.log('Hall names:', hallNames);
      });
    });
  }

  setDeleteBooking(bookingId: string) {
    this.deleteBookingId = bookingId;
    this.confirmDelete = true;
  }

  deleteBooking() {
    this.slotService.deleteBooking(this.deleteBookingId).subscribe(() => {
      this.userBookings = this.userBookings.filter((booking: Booking) =>
        booking.id !== this.deleteBookingId);
    }); this.confirmDelete = false;
  }

  cancelDelete() {
    this.confirmDelete = false;
  }

  getHallName(partyHallId: string): string {
    const hall = this.matchingHalls.find(hall => hall.id === partyHallId);
    return hall ? hall.name : '';
  }
}