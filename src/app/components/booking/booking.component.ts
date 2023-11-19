import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SlotService } from 'src/app/services/slot.service';
import { Router } from '@angular/router';
import { PartyHallService } from 'src/app/services/party-hall.service';
import { PartyHall } from 'src/app/models/party-hall';
import { Subscription } from 'rxjs';

declare var Razorpay: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  id!: string;
  bookedDateRanges!: any[];
  minDate: Date;
  maxDate: Date;
  datesToDisable: Date[] = [];
  startDate!: Date;
  endDate!: Date;

  partyHalls: PartyHall[] = [];
  partyHallsSubscription!: Subscription;

  constructor(private partyHallService: PartyHallService, private slotService: SlotService, private router: Router) {
    // Set the min and max dates for the datepicker
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    this.maxDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
  }

  ngOnInit() {
    this.partyHallService.id$.subscribe(id => {
      this.id = id;
      console.log(`ID: ${this.id}`);
      //userid
      console.log(this.slotService.userId+" hey")
      // Fetch all the booking data
      this.slotService.getSlots().subscribe((bookings) => {
        console.log(`All Bookings:`, bookings);
        // Filter out the bookings for the party hall with the specified id
        const filteredBookings = bookings.filter((booking) => booking.partyHallId == this.id);
        console.log(`Filtered Bookings:`, filteredBookings);
        // Populate the bookedDateRanges array with the start and end dates of the filtered bookings
        const bookedDateRanges = filteredBookings.map((booking) => {
          const startDate = new Date(Date.parse(booking.startDate)); // parse start date
          const endDate = new Date(Date.parse(booking.endDate)); // parse end date
          const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          console.log(`Start Date: ${startDate}, End Date: ${endDate}, Difference in Days: ${diffDays}`);
          // Calculate the difference between the dates in days
          const dates = [];
          for (let i = 0; i < diffDays; i++) {
            const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
            dates.push(date);
          }
          return { startDate, endDate, dates };
        });
        console.log(`Booked Date Ranges:`, bookedDateRanges);
        // Merge overlapping date ranges and add them to the datesToDisable array
        this.datesToDisable = this.mergeDateRanges(bookedDateRanges).map((range) => range.dates).flat();
      });
    });
  }

  // Merge overlapping date ranges
  mergeDateRanges(ranges: any[]): any[] {
    const sortedRanges = ranges.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const mergedRanges = [sortedRanges[0]];
    sortedRanges.slice(1).forEach((range) => {
      const lastRange = mergedRanges[mergedRanges.length - 1];
      if (range.startDate <= lastRange.endDate) {
        lastRange.endDate = range.endDate > lastRange.endDate ? range.endDate : lastRange.endDate;
        lastRange.dates = this.mergeDateArrays(lastRange.dates, range.dates);
      } else {
        mergedRanges.push(range);
      }
    });
    return mergedRanges;
  }

  // Merge arrays of unique dates
  mergeDateArrays(arr1: Date[], arr2: Date[]): Date[] {
    const merged = new Set([...arr1, ...arr2]);
    return Array.from(merged).sort((a, b) => a.getTime() - b.getTime());
  }

  // Disable dates that are within bookedDateRanges
  isDateDisabled(date: Date): boolean {
    if (date) {
      const selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // set selected date to midnight to avoid timezone issues
      const isDisabled = this.datesToDisable.some((disabledDate) =>
        disabledDate && selectedDate.getTime() === disabledDate.getTime()
      );
      return isDisabled;
    } else {
      return false;
    }
  }

  // Handle input events for the start date mat-datepicker
  handleStartDateInput(event: MatDatepickerInputEvent<any>): void {
    console.log("Selected start date:", event.value);
    this.startDate = event.value;
  }

  // Handle input events for the end date mat-datepicker
  handleEndDateInput(event: MatDatepickerInputEvent<any>): void {
    console.log("Selected end date:", event.value);
    this.endDate = event.value;
  }

  payNow(): void {
    if (this.isDateDisabled(this.startDate) || this.isDateDisabled(this.endDate)) {
      return;
    }
    const razorpayOptions = {
      description: 'Sample Razorpay',
      currency: 'USD',
      amount: 30000,
      name: 'User',
      key: 'rzp_test_A7L1Y2WxpEwsyT',
      image: 'https://th.bing.com/th/id/OIP.PqeeWcgP2vqyNHU_zE0AmQAAAA?w=396&h=396&rs=1&pid=ImgDetMain',
      prefill: {
        name: 'User',
      },
      theme: {
        color: '#59599a'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(razorpayOptions, successCallback, failureCallback)

    const userId = this.slotService.userId;
    const startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate()).toISOString();
    const endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() + 1).toISOString();
    const booking = { userId, partyhallid: this.id, startDate, endDate, isconfirmed: true };

    this.slotService.confirmBooking(booking).subscribe((response) => {
      console.log("Booking in progress:", response); // Handle success/failure here 
    });
    this.router.navigate(['/user-dashboard/party-hall-list']);
  }
}