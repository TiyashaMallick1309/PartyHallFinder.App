import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private slotsUrl = 'https://localhost:7091/api/Bookings';
  userId!: string;

  constructor(private http: HttpClient) {}

  getSlots(): Observable<any[]> {
    return this.http.get<any[]>(this.slotsUrl);
  }

  confirmBooking(bookingDetails: any): Observable<any> {
    return this.http.post<any>(this.slotsUrl, bookingDetails);
  }

  deleteBooking(bookingId: string): Observable<any> { 
    const url = `${this.slotsUrl}/${bookingId}`;
    return this.http.delete(url);
   }

  setUserId(userId: string) {
    this.userId = userId;
  }
}

