import { Injectable } from '@angular/core';
import { Availability, PartyHall, Pricing } from '../models/party-hall';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { Address } from '../models/user';
import { Router } from '@angular/router';

interface AddressDetails {
  street: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
}

interface PricingDetails {
  perHour: number;
  perDay: number;
  perWeek: number;
}

interface AvailabilityDetails {
  startDateTime: Date;
  endDateTime: Date;
  range: string;
}

@Injectable({
  providedIn: 'root'
})

export class PartyHallService {
  baseUrl = 'https://localhost:7091/api';
  url = "PartyHalls";
  partyHall$!: Observable<PartyHall[]>;

  isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  IdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  nameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  AddressSubject: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);
  CapacitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  AmenitiesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  PricingSubject: BehaviorSubject<Pricing[]> = new BehaviorSubject<Pricing[]>([]);
  AvailabilitySubject: BehaviorSubject<Availability[]> = new BehaviorSubject<Availability[]>([]);
  ImageSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private router: Router, private http: HttpClient) { }

  public getPartyHalls(): Observable<PartyHall[]> {
    return this.http.get<PartyHall[]>(`${this.baseUrl}/${this.url}`);
  }

  getPartyHall(userId: string): Observable<PartyHall> {
    return this.http.get<PartyHall>(`${this.baseUrl}/${this.url}/${userId}`);
  }

  getImageUrl(imageUrls: string[]): string | undefined {
    return imageUrls ? imageUrls[0] : undefined;
  }

  // Method to convert availability date objects to string range
  convertAvailabilityToRange(availability: { startDateTime: Date, endDateTime: Date }): string {
    const startDateTime = availability.startDateTime.toLocaleString();
    const endDateTime = availability.endDateTime.toLocaleString();
    return `${startDateTime} - ${endDateTime}`;
  }

  GetDetails() {
    this.partyHall$.pipe(first()).subscribe((partyHalls: PartyHall[]) => {
      const latestHall = partyHalls[partyHalls.length - 1];
      this.isAuthenticatedSubject.next(true);
      this.IdSubject.next(latestHall.id);
      this.nameSubject.next(latestHall.name);

      const addressDetails: AddressDetails = {
        street: latestHall.address?.street ?? '',
        city: latestHall.address?.city ?? '',
        state: latestHall.address?.state ?? '',
        country: latestHall.address?.country ?? '',
        postalcode: latestHall.address?.postalcode ?? ''
      };
      const address: Address[] = [addressDetails as Address];
      this.AddressSubject.next(address);

      this.CapacitySubject.next(latestHall.capacity);
      this.AmenitiesSubject.next(latestHall.amenities);

      const pricingDetails: PricingDetails = {
        perHour: latestHall.pricing?.perHour ?? '',
        perDay: latestHall.pricing?.perDay ?? '',
        perWeek: latestHall.pricing?.perWeek ?? '',
      };
      const pricing: Pricing[] = [pricingDetails as Pricing];
      this.PricingSubject.next(pricing);

      const availabilityDetails: AvailabilityDetails = {
        startDateTime: latestHall.availability?.startDateTime ?? '',
        endDateTime: latestHall.availability?.endDateTime ?? '',
        range: latestHall.availability?.range ?? '',
      };
      const availability: Availability[] = [availabilityDetails as Availability];
      this.AvailabilitySubject.next(availability);

      this.ImageSubject.next(latestHall.images);
    });
  }
}
