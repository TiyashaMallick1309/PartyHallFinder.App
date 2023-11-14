import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  partyHalls: any[] = [];
  user: any = {};

  constructor(private router:Router) { }

  ngOnInit() {
    this.router.navigate(['/party-hall-list']);
  }

  logout() {
    // Clear user session or any other related task.
    // Navigate to the login page
    this.router.navigate(['/']);
  }

}
