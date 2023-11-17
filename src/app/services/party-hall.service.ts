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
  partyHall : any[] = [];
  
  constructor(private router: Router, private http: HttpClient) { }

  public getPartyHalls(): Observable<PartyHall[]> {
    return this.http.get<PartyHall[]>(`${this.baseUrl}/${this.url}`);
  }

  getPartyHall(id: string): Observable<PartyHall> {
    return this.http.get<PartyHall>(`${this.baseUrl}/${this.url}/${id}`);
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

    // Adding item to savedHalls
    savedHalls(item : any) {
        this.partyHall.push(item);
    }

    // Method to remove item from savedHalls
    removeFromSaved(item : any) {
        const index = this.partyHall.findIndex((i) => i.id === item.id);
        if (index !== -1) {
            this.partyHall.splice(index, 1);
        }
    }

    // Clear the savedHalls
    clearsavedHalls() {
        this.partyHall = [];
    }

    // Get the savedHalls items
    getsavedHalls(): any[]{
        return this.partyHall;
    }

  }
