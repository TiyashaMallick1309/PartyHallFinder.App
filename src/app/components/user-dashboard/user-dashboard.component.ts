import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  partyHalls: any[] = [];
  user: any = {};

  constructor(private router:Router,private auth:AuthorizationService) { }

  ngOnInit() {
    this.router.navigate(['user-dashboard/party-hall-list']);
  }

  logout(){
    this.auth.isAuthenticatedSubject.next(false);
    this.auth.userTypeSubject.next('');
    this.auth.usernameSubject.next('');
    this.router.navigate(['/'])
  }

}
