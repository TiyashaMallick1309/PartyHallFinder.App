import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent {
  partyHalls: any[] = [];
  owner: any = {};
  ownerNotifications: { message: string, isRead: boolean, dateCreated: Date, routerLink: string }[] = [];
  showNotifList = false;

  constructor(private router:Router,private auth:AuthorizationService) { }

  ngOnInit() {
    this.router.navigate(['owner-dashboard/owner-details']);
     // Retrieve user data from local storage
     const currentOwner = JSON.parse(localStorage.getItem('currentOwner') || '{}');
     if (currentOwner && currentOwner.id) {
       this.owner = currentOwner;
       console.log('Owner data in OwnerDashboardComponent', this.owner);

       // Retrieve user notifications from local storage
    const ownerNotifications = JSON.parse(localStorage.getItem('ownerNotifications') || '[]');
    this.ownerNotifications = ownerNotifications;
    console.log('Owner notifications:', this.ownerNotifications);
     }
 
  }

  logout(){
    this.auth.isAuthenticatedSubject.next(false);
    this.auth.TypeSubject.next('');
    this.auth.nameSubject.next('');
    localStorage.removeItem('currentOwner');
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/']);
  }

  showNotifications(userType: string): void {
    if (userType === 'user') {
      this.showNotifList = true;
      this.markAsReadAll(userType);
    }
  }
  
  markAsRead(notif: { message: string, isRead: boolean, dateCreated: Date, routerLink: string }): void {
    notif.isRead = true;
    localStorage.setItem('ownerNotifications', JSON.stringify(this.ownerNotifications));
  }
  
  markAsReadAll(userType: string): void {
    if (userType === 'user') {
      this.ownerNotifications.forEach((notif) => { notif.isRead = true; });
      localStorage.setItem('ownerNotifications', JSON.stringify(this.ownerNotifications));
    }
  }
  
  clearAllNotifications(userType: string): void {
    if (userType === 'user') {
      this.ownerNotifications = [];
      localStorage.setItem('ownerNotifications', JSON.stringify([]));
    }
  }
}
