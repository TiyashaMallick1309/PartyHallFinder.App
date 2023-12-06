import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})

export class OwnerDashboardComponent {
  partyHalls: any[] = [];
  owner: any = {};
  ownerNotifications: { message: string, isRead: boolean, dateCreated: Date }[] = [];
  showNotifList = false;
  bookingHistory: any[] = [];

  constructor(private notificationService: NotificationService, private router: Router, private auth: AuthorizationService) { }

  ngOnInit() {
    this.router.navigate(['owner-dashboard/owner-details']);
    // Retrieve user data from local storage
    const currentOwner = JSON.parse(localStorage.getItem('currentOwner') || '{}');
    if (currentOwner && currentOwner.id) {
      this.owner = currentOwner;
      console.log('Owner data in OwnerDashboardComponent', this.owner);
      this.bookingHistory = this.notificationService.getBookingHistory();
      console.log(this.bookingHistory);
      this.ownerNotifications = [];
  
      this.bookingHistory.forEach(bookingObj => {
        const booking = bookingObj.booking;
        console.log(bookingObj);
        console.log(this.owner.ownedHall);
        this.owner.ownedHall.forEach((hallId: any) => {
          if (booking.partyhallid === hallId) {
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            const message = `Your party hall (${bookingObj.partyHallName}) has been booked from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}.`;
            const notification = {
              message: message,
              isRead: false,
              dateCreated: new Date()
            };
            this.ownerNotifications.push(notification);
          }
        });
      });
    }
  }

  showNotifications() {
    this.showNotifList = !this.showNotifList;
    if (this.showNotifList) {
      this.ownerNotifications.forEach(notif => notif.isRead = true);
      const updatedOwner = JSON.parse(localStorage.getItem('currentOwner') || '{}');
      updatedOwner.notifications = this.ownerNotifications;
      localStorage.setItem('currentOwner', JSON.stringify(updatedOwner));
    }
  }

  logout() {
    this.auth.isAuthenticatedSubject.next(false);
    this.auth.TypeSubject.next('');
    this.auth.nameSubject.next('');
    localStorage.removeItem('currentOwner');
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/']);
  }

  markAsRead(notification: any) {
    notification.isRead = true;
    const updatedOwner = JSON.parse(localStorage.getItem('currentOwner') || '{}');
    updatedOwner.notifications = this.ownerNotifications;
    localStorage.setItem('currentOwner', JSON.stringify(updatedOwner));
  }

}
