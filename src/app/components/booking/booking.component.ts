import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SlotService } from 'src/app/services/slot.service';
import { ActivatedRoute } from '@angular/router';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  loading: boolean = true;
  selectedDate: Date | null = null;
  availableSlots!: any[];
  selectedSlot: any;
  id!: string;
  bookedDateRanges: { startDate: Date, endDate: Date }[] = [];

  constructor(private slotService: SlotService, private route:ActivatedRoute, private partyHallService: PartyHallService) { }

  ngOnInit() {
    this.partyHallService.id$.subscribe(id => {
      this.id = id;
      console.log(this.id);

      // Fetch the booking data for the party hall using the id
      this.slotService.getBookingsForPartyHall(this.id).subscribe(bookings => {
        // Populate the bookedDateRanges array with the start and end dates of the bookings
        this.bookedDateRanges = bookings.map(booking => ({
          startDate: new Date(booking.startDate),
          endDate: new Date(booking.endDate)
        }));
        console.log(bookings+" hey")
        console.log(this.bookedDateRanges);
        this.loadSlots();
      });
    });   
  }

  loadSlots() {
    this.slotService.getSlots().subscribe(slots => {
      this.availableSlots = slots;
      console.log("Available Slots:");
      for (let slot of this.availableSlots) {
        const { startTime, endTime, booked } = slot;
        console.log(`${startTime} - ${endTime}, Booked: ${booked} av`);
      }
      this.loading = false;
    });
  }

  dateSelected(event: any) {
    if (event != null && event.value != null) {
      this.selectedDate = event.value;
    } else {
      this.selectedDate = null;
    }
  }

  isSlotAvailable(slot: any) {
    const selectedDateTimestamp = new Date(this.selectedDate!).getTime();
    const slotStartTimeTimestamp = new Date(slot.startTime).getTime();
    const slotEndTimeTimestamp = new Date(slot.endTime).getTime();

    // check if selected date falls within the slot's duration
    if (selectedDateTimestamp >= slotStartTimeTimestamp
      && selectedDateTimestamp <= slotEndTimeTimestamp) {
      // check if slot is already booked
      if (!slot.booked) {
        return true;
      }
    }
    return false;
  }

  selectSlot(slot: any) {
    if (this.isSlotAvailable(slot)) {
      this.selectedSlot = slot;
    }
  }

  bookSlot() {
    if (this.selectedSlot) {
      this.slotService.bookSlot(this.selectedSlot as any).subscribe(response => {
        this.selectedSlot.booked = true;
      });
    }
  }

  confirmBooking() {
    if (this.selectedSlot) {
      const bookingDetails = {
        slot: this.selectedSlot,
        name: '',
        email: ''
      };
      this.slotService.confirmBooking(bookingDetails).subscribe(response => {
        this.selectedSlot = null;
        this.selectedDate = null;
        this.loadSlots();
      });
    }
  }

  markedDates: Date[] = [];

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const displayedDate = new Date(date).setHours(0, 0, 0, 0); // Normalize to compare dates only

      for (let range of this.bookedDateRanges) {
        const rangeStartDateTimestamp = new Date(range.startDate).setHours(0, 0, 0, 0);
        const rangeEndDateTimestamp = new Date(range.endDate).setHours(0, 0, 0, 0);

        // check if displayed date falls within a booked range
        if (displayedDate >= rangeStartDateTimestamp && displayedDate <= rangeEndDateTimestamp) {
          // If the date is within a booked range, return 'booked-slot'
          return 'booked-slot';
        }
      }

      // If the date is not within a booked range, return 'available-date'
      return 'available-date';
    };
  }

  isDateBooked(date: Date): boolean {
    const displayedDate = date.setHours(0, 0, 0, 0); // Normalize to compare dates only

    for (let range of this.bookedDateRanges) {
      const rangeStartDateTimestamp = new Date(range.startDate).setHours(0, 0, 0, 0);
      const rangeEndDateTimestamp = new Date(range.endDate).setHours(0, 0, 0, 0);

      // check if displayed date falls within a booked range
      if (displayedDate >= rangeStartDateTimestamp && displayedDate <= rangeEndDateTimestamp) {
        // If the date is within a booked range, return true
        return true;
      }
    }

    // If the date is not within any booked range, return false
    return false;
  }
}