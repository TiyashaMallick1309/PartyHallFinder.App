import { Injectable } from '@angular/core';
import { PartyHall } from '../models/party-hall';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PartyHallService {
  baseUrl = 'https://localhost:7091/api';
  url = "PartyHalls";
  partyHall: any[] = [];

  private selectedPartyHallSubject = new BehaviorSubject<PartyHall | null>(null);

  private ownerIdSource = new BehaviorSubject<string>('');
  ownerId$ = this.ownerIdSource.asObservable();

  private idSource = new BehaviorSubject<string>('');
  id$ = this.idSource.asObservable();
  
  constructor(private router: Router, private http: HttpClient) { }

  setId(id: string) {
    this.idSource.next(id);
  }

  setOwnerId(id: string) {
    this.ownerIdSource.next(id);
  }

  public getPartyHalls(): Observable<PartyHall[]> {
    return this.http.get<PartyHall[]>(`${this.baseUrl}/${this.url}`);
  }

  getPartyHall(id: string): Observable<PartyHall> {
    return this.http.get<PartyHall>(`${this.baseUrl}/${this.url}/${id}`);
  }

  updatePartyHall(id: string, data: any) {
    return this.http.put(`https://localhost:7091/api/PartyHalls/${id}`, data);
  }

  getImageUrl(imageUrls: string[]): string | undefined {
    return imageUrls ? imageUrls[0] : undefined;
  }

  addPartyHall(partyHallData: any) {
    return this.http.post('https://localhost:7091/api/PartyHalls', partyHallData);
  }

  // Adding item to savedHalls
  savedHalls(item: any) {
    const index = this.partyHall.findIndex((i) => i.id === item.id);
    if (index === -1) {
      this.partyHall.push(item);
    } else {
      console.log('Item is already in the wishlist');
    }
  }

  // Method to remove item from savedHalls
  removeFromSaved(item: any) {
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
  getsavedHalls(): any[] {
    return this.partyHall;
  }

  uploadHall(name: string) {
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

  setSelectedPartyHall(partyHall: PartyHall | null): void {
    this.selectedPartyHallSubject.next(partyHall);
  }

  getSelectedPartyHall(): Observable<PartyHall | null> {
    return this.selectedPartyHallSubject.asObservable();
  }

}
