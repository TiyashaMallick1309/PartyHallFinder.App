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
  userNotifications: { message: string, isRead: boolean, dateCreated: Date}[] = [];
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
      console.log(this.bookingHistory)
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
    this.showNotifList = !this.showNotifList; // toggle the showNotifList variable
    if (userType === 'user') {
      const lastProcessedBooking = localStorage.getItem('lastProcessedBooking');
      let lastDateProcessed = lastProcessedBooking ? new Date(JSON.parse(lastProcessedBooking).booking.endDate) : new Date(0); // set initial value to Jan 1, 1970
      const relevantBookings = this.bookingHistory.filter((booking) => booking.user.id === this.user.id);
      relevantBookings.forEach((booking) => {
        const startDate = new Date(booking.booking.startDate);
        const endDate = new Date(booking.booking.endDate);
        if (endDate > lastDateProcessed) {
          // Create notification message
          const message = `Booking confirmed: ${booking.partyHallName} from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
          
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
        }
      });
      
      // Save notifications to local storage
      localStorage.setItem('userNotifications', JSON.stringify(this.userNotifications));
    }
  }

  markAsRead(notif: { message: string, isRead: boolean, dateCreated: Date}): void {
    notif.isRead = true;
    
    // Update userNotifications array in localStorage after marking a notification as read
    localStorage.setItem('userNotifications', JSON.stringify(this.userNotifications));
  }

}
