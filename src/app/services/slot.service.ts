import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private slotsUrl = 'https://localhost:7091/api/Bookings';

  constructor(private http: HttpClient) {}

  getSlots(): Observable<any[]> {
    return this.http.get<any[]>(this.slotsUrl);
  }

  getBookingsForPartyHall(partyHallId: string): Observable<any[]> {
    const url = `${this.slotsUrl}?partyHallId=${partyHallId}`;
    return this.http.get<any[]>(url);
  }
  
  bookSlot(slot: any): Observable<any> {
    const bookingUrl = `${this.slotsUrl}/${slot.id}/book`;
    return this.http.post<any>(bookingUrl, slot);
  }

  confirmBooking(bookingDetails: any): Observable<any> {
    const confirmUrl = `${this.slotsUrl}/confirm`;
    return this.http.post<any>(confirmUrl, bookingDetails);
  }
}
