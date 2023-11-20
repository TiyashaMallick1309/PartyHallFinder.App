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
  savedHalls: any[] = [];

  private savedHallsSubject = new BehaviorSubject<any[]>([]);
  savedHalls$!: Observable<any[]>;

  private selectedPartyHallSubject = new BehaviorSubject<PartyHall | null>(null);

  private ownerIdSource = new BehaviorSubject<string>('');
  ownerId$ = this.ownerIdSource.asObservable();

  private idSource = new BehaviorSubject<string>('');
  id$ = this.idSource.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    // Retrieve saved halls from local storage and store it in the savedHalls variable
    this.savedHalls = JSON.parse(localStorage.getItem('savedHalls') || '[]');
    console.log('Retrieved saved halls:', this.savedHalls);
  }

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

  // Method to add item to savedHalls and update local storage
  addToSavedHalls(item: any) {
    console.log('Saved halls in addToSavedHalls method:', this.savedHalls);
    const index = this.savedHalls.findIndex((i) => i.id === item.id);
    if (index === -1) {
      this.savedHalls.push(item);
      console.log('Party hall added to saved halls:', this.savedHalls);
      this.saveToLocalStorage(this.savedHalls);
      console.log('Saved halls updated in local storage:', JSON.parse(localStorage.getItem('savedHalls') || '[]'));
    } else {
      console.log('Item is already in the saved list');
    }
  }

  // Method to remove item from savedHalls and update local storage
  removeFromSaved(item: any) {
    console.log('Saved halls in removeFromSaved method:', this.savedHalls);
    const index = this.savedHalls.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.savedHalls.splice(index, 1);
      console.log('Party hall removed from saved halls:', this.savedHalls);
      this.saveToLocalStorage(this.savedHalls);
      console.log('Saved halls updated in local storage:', JSON.parse(localStorage.getItem('savedHalls') || '[]'));
    }
  }

  // Method to clear entire savedHalls and update local storage
  clearSavedHalls() {
    this.savedHalls = [];
    console.log('Saved halls cleared:', this.savedHalls);
    this.saveToLocalStorage(this.savedHalls);
    console.log('Saved halls updated in local storage:', JSON.parse(localStorage.getItem('savedHalls') || '[]'));
  }

  //Helper method to update savedHalls in local storage
  private saveToLocalStorage(savedHalls: any[]) {
    localStorage.setItem('savedHalls', JSON.stringify(savedHalls));
  }

  private getFromLocalStorage(): any[] {
    const savedHalls = JSON.parse(localStorage.getItem('savedHalls') || '[]');
    console.log("Retrieved saved halls from local storage: ", savedHalls);
    return savedHalls;
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
