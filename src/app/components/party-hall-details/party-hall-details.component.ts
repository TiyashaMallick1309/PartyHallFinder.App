import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Availability, Pricing } from 'src/app/models/party-hall';
import { Address } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-party-hall-details',
  templateUrl: './party-hall-details.component.html',
  styleUrls: ['./party-hall-details.component.css']
})
export class PartyHallDetailsComponent {
  name!: string;
  address: Address[] = [];
  capacity!: number;
  amenities: string[] = [];
  pricing: Pricing[] = [];
  availability: Availability[] = [];
  images: string[] = [];

  constructor(private partyHallService: PartyHallService, private auth: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.partyHallService.isAuthenticatedSubject.pipe(filter(isAuthenticated => isAuthenticated)).subscribe(() => {
      this.partyHallService.nameSubject.subscribe(name => {
        this.name = name;
      });
      this.partyHallService.CapacitySubject.subscribe(capacity => {
        this.capacity = capacity;
      });
      this.partyHallService.AmenitiesSubject.subscribe(amenities => {
        this.amenities = amenities;
      });
      this.partyHallService.PricingSubject.subscribe(pricing => {
        this.pricing = pricing;
      });
      this.partyHallService.AddressSubject.subscribe(address => {
        this.address = address;
      });
      this.partyHallService.AvailabilitySubject.subscribe(availability => {
        this.availability = availability;
      });
      this.partyHallService.ImageSubject.subscribe(images => {
        this.images = images;
      });
    });

    this.router.navigate(['owner-dashboard/party-halls-list']);
    this.router.navigate(['owner-dashboard/owner-details']);
  }

  logout(){
    this.auth.isAuthenticatedSubject.next(false);
    this.auth.TypeSubject.next('');
    this.auth.nameSubject.next('');
    this.router.navigate(['/'])
  }

}
