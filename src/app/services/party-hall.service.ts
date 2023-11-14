import { Injectable } from '@angular/core';
import { PartyHall } from '../models/party-hall';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartyHallService {

  url="PartyHalls";
  constructor(private http: HttpClient) { }

  public getPartyHalls(): Observable<PartyHall[]>{
    return this.http.get<PartyHall[]>(`${environment.apiUrl}/${this.url}`);
  }

  getImageUrl(imageUrls: string[]): string | undefined {
    return imageUrls ? imageUrls[0] : undefined;
  }

  private apiUrl = 'api/partyHalls';

  getPartyHallById(id: string): Observable<PartyHall> {
    return this.http.get<PartyHall>(`${this.apiUrl}/${id}`);
  }

  addPartyHall(partyHall: PartyHall): Observable<PartyHall> {
    return this.http.post<PartyHall>(this.apiUrl, partyHall);
  }

  updatePartyHall(partyHall: PartyHall): Observable<any> {
    return this.http.put(`${this.apiUrl}/${partyHall.id}`, partyHall);
  }

  deletePartyHall(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Method to convert availability date objects to string range
  convertAvailabilityToRange(availability: {startDateTime: Date, endDateTime: Date}): string {
    const startDateTime = availability.startDateTime.toLocaleString();
    const endDateTime = availability.endDateTime.toLocaleString();
    return `${startDateTime} - ${endDateTime}`;
  }

}
