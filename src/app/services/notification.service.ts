import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  setUser(user: any): void {
    this.userSubject.next(user);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  // Function to get booking history from local storage
  getBookingHistory(): any[] {
    return JSON.parse(localStorage.getItem('bookingHistory') || '[]');
  }

}
