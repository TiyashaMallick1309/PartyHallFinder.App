import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SlotService } from 'src/app/services/slot.service';

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

  constructor(private slotService: SlotService) {}

  ngOnInit() {
    this.loadSlots();
  }

  loadSlots() {
    this.slotService.getSlots().subscribe(slots => {
      this.availableSlots = slots;
      this.loading = false;
    });
  }

  dateSelected(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
  }

  selectSlot(slot: any) {
    this.selectedSlot = slot;
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
}
