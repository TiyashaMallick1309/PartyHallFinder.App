import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { PartyHall } from 'src/app/models/party-hall';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  
  name!: string;
  email!: string;
  phonenumber: string = '';
  id: string = '';
  partyHalls: PartyHall[] = [];

  // Array to hold all the party halls owned by the current owner
  currentPartyHalls: PartyHall[] = [];

  constructor(
    private authService: AuthorizationService,
    private apiService: ApiService,
    private router: Router,
    public partyHallService: PartyHallService
  ) {}

  ngOnInit() {
    this.authService.isAuthenticatedSubject
      .pipe(filter(isAuthenticated => isAuthenticated))
      .subscribe(() => {
        this.authService.nameSubject.subscribe(name => {
          this.name = name;
        });
        this.authService.EmailSubject.subscribe(email => {
          this.email = email;
        });
        this.authService.PhoneNumberSubject.subscribe(phonenumber => {
          this.phonenumber = phonenumber;
        });
        this.authService.IdSubject.subscribe(id => {
          this.id = id;

          // Set the owner id
          this.partyHallService.setOwnerId(this.id);
        });

        // Get all party halls
        this.partyHallService.getPartyHalls().subscribe((partyHalls: PartyHall[]) => {
          this.partyHalls = partyHalls;

          // Filter party halls by the current owner's id and store them in currentPartyHalls array
          this.currentPartyHalls = this.partyHalls.filter(partyHall => partyHall.ownerId == this.id);
        });
      });
  }

  openPartyHallDetails(partyHall: PartyHall) {
    if (partyHall && partyHall.id) {
      this.router.navigate(['party-hall-list', partyHall.id]);
    }
  }

  handleImageError(event: Event): void {
    console.error('Image error: ', event);
  }
}