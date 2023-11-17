import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  partyHalls: any[] = [];
  user: any = {};

  constructor(private router:Router,private auth:AuthorizationService, private partyHallService: PartyHallService) { }

  ngOnInit() {
    this.router.navigate(['user-dashboard/party-hall-list']);
    this.router.navigate(['user-dashboard/user-history']);
  }

  logout(){
    this.auth.isAuthenticatedSubject.next(false);
    this.auth.TypeSubject.next('');
    this.auth.nameSubject.next('');
    this.router.navigate(['/'])
  }

  savedHalls(partyHall : any) {
    this.partyHallService.savedHalls(partyHall);
    alert("Party Hall saved!");
}

savedList(){
  this.router.navigate(['user-dashboard/saved']);
}

}
