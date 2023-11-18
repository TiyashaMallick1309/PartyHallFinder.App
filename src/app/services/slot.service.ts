import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private slotsUrl = 'api/slots';

  constructor(private http: HttpClient) {}

  getSlots(): Observable<any[]> {
    return this.http.get<any[]>(this.slotsUrl);
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
