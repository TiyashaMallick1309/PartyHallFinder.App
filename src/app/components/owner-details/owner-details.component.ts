import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit{
  name!: string;
  email!: string;
  phonenumber :string = '';
  id: string = '';

  constructor(private authService: AuthorizationService, private apiService: ApiService, private router: Router, private partyHallService:PartyHallService) { }

  ngOnInit() {
    this.authService.isAuthenticatedSubject.pipe(filter(isAuthenticated => isAuthenticated)).subscribe(() => {
      this.authService.nameSubject.subscribe(name => {
        this.name = name;
      });
      this.authService.EmailSubject.subscribe(email => {
        this.email = email;
      });
      this.authService.PhoneNumberSubject.subscribe(phonenumber  => {
        this.phonenumber  = phonenumber ;
      });
      this.authService.IdSubject.subscribe(id=>{
        this.id = id;
        console.log(this.id)
        this.partyHallService.setOwnerId(this.id);
      })
    });
  }
}