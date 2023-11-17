import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  partyHalls: any[] = [];
  user!: User;

  constructor(private router:Router,private auth:AuthorizationService, private partyHallService: PartyHallService) { }

  ngOnInit() {
    this.router.navigate(['user-dashboard/party-hall-list']);
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
