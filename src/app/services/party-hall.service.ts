import { Injectable } from '@angular/core';
import { PartyHall } from '../models/party-hall';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyHallService {
  baseUrl = 'https://localhost:7091/api';
  url = "PartyHalls";
  constructor(private http: HttpClient) { }

  public getPartyHalls(): Observable<PartyHall[]> {
    return this.http.get<PartyHall[]>(`${this.baseUrl}/${this.url}`);
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

}
