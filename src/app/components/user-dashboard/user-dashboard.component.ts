import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  partyHalls: any[] = [];
  user!: User;
  savedHalls: any[] = [];
  userNotifications: { message: string, isRead: boolean, dateCreated: Date }[] = [];
  showNotifList = false;
  bookingHistory: any[] = [];

  constructor(private notificationService: NotificationService, private router: Router, private auth: AuthorizationService, private partyHallService: PartyHallService) { }

  ngOnInit() {
    // Navigate to party hall list
    this.router.navigate(['user-dashboard/party-hall-list']);

    // Retrieve user data from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.id) {
      this.user = currentUser;
      console.log('User data in UserDashboardComponent', this.user);
      // Pass user data to notification service
      this.notificationService.setUser(this.user);
      this.bookingHistory = this.notificationService.getBookingHistory();
      console.log(this.bookingHistory);
      // Retrieve user notifications array from localStorage and set it as the value of the userNotifications property
      this.userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    }
    this.getSavedHalls();
  }

  getSavedHalls() {
    this.savedHalls = this.partyHallService.savedHalls;
    console.log('Retrieved saved halls:', this.savedHalls);
  }

  logout() {
    this.auth.isAuthenticatedSubject.next(false);
    this.auth.TypeSubject.next('');
    this.auth.nameSubject.next('');
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/']);
  }

  savedList() {
    // Navigate to the saved halls list component and pass the saved halls from the service
    this.router.navigate(['user-dashboard/saved'], { state: { savedHalls: this.partyHallService.savedHalls } });
  }

  showNotifications(userType: string): void {
    this.showNotifList = !this.showNotifList;
    // toggle the showNotifList variable 
    if (userType === 'user') {
      const lastProcessedBooking = localStorage.getItem('lastProcessedBooking');
      let lastDateProcessed = lastProcessedBooking ?
        new Date(JSON.parse(lastProcessedBooking).booking.endDate) : new Date(0);
      const relevantBookings = this.bookingHistory.filter((booking) => booking.user.id === this.user.id);

      // Clear userNotifications array before adding new notifications
      this.userNotifications = [];

      relevantBookings.forEach((booking) => {
        const startDate = new Date(booking.booking.startDate);
        const endDate = new Date(booking.booking.endDate);
        // Create notification message
        const message = `Booking successful: ${booking.partyHallName} from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;

        // Create new notification object and add to userNotifications array
        const notification = {
          message: message,
          isRead: false,
          dateCreated: new Date()
        };
        this.userNotifications.push(notification);

        // Update lastProcessedBooking in local storage
        localStorage.setItem('lastProcessedBooking', JSON.stringify(booking));
        lastDateProcessed = endDate;
      });

      // Save notifications to local storage
      localStorage.setItem('userNotifications', JSON.stringify(this.userNotifications));
    }
  }

  markAsRead(notif: { message: string, isRead: boolean, dateCreated: Date }): void {
    console.log('Marking notification as read', notif);
    notif.isRead = true;

    // Update the userNotifications array in localStorage to mark the notification as read
    const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    const updatedNotifications = userNotifications.map((n: any) => {
      if (n.message === notif.message) {
        n.isRead = true;
      }
      return n;
    });
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));

    // Update the userNotifications array in the component to remove the read notification
    this.userNotifications = updatedNotifications.filter((n: any) => !n.isRead);
  }

  MyBookings() {
    this.router.navigate(['user-dashboard/mybooking'])
  }

}
