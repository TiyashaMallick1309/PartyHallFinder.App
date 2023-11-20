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

  constructor(private router:Router,private auth:AuthorizationService) { }

  ngOnInit() {
    this.router.navigate(['owner-dashboard/owner-details']);
     // Retrieve user data from local storage
     const currentOwner = JSON.parse(localStorage.getItem('currentOwner') || '{}');
     if (currentOwner && currentOwner.id) {
       // Initialize component properties with user data
       this.owner = currentOwner;
 
       // (optional) log the user data
       console.log('Owner data in OwnerDashboardComponent', this.owner);
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
}
