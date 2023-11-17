import { Injectable } from '@angular/core';
import { PartyHall } from '../models/party-hall';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PartyHallService {
  baseUrl = 'https://localhost:7091/api';
  url = "PartyHalls";
  partyHall : any[] = [];

  private ownerIdSource = new BehaviorSubject<string>('');
  ownerId$ = this.ownerIdSource.asObservable();
  
  constructor(private router: Router, private http: HttpClient) { }

  setOwnerId(id: string) {
    this.ownerIdSource.next(id);
  }

  public getPartyHalls(): Observable<PartyHall[]> {
    return this.http.get<PartyHall[]>(`${this.baseUrl}/${this.url}`);
  }

  getPartyHall(id: string): Observable<PartyHall> {
    return this.http.get<PartyHall>(`${this.baseUrl}/${this.url}/${id}`);
  }

  getImageUrl(imageUrls: string[]): string | undefined {
    return imageUrls ? imageUrls[0] : undefined;
  }

  addPartyHall(partyHallData: any) {
    return this.http.post('https://localhost:7091/api/PartyHalls', partyHallData);
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

    uploadHall(name:string){
      const url = `${this.baseUrl}/${this.url}`;
      const requestBody = {
        name
      };

      return this.http
      .post(url, requestBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError('Error while authenticating');
        })
      );
      
  }

  }
