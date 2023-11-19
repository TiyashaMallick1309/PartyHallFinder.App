import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import {first} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Address, User } from '../models/user';
import { Owner } from '../models/owner';

interface AddressDetails {
  street: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthorizationService {
  private baseUrl='https://localhost:7091/api';
   isAuthenticatedSubject :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   nameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   TypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   IdSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
   EmailSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   AddressSubject: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);
   PhoneNumberSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   
   loggedInUser = new BehaviorSubject<User[]>([]);
  
  constructor(private apiService: ApiService, private router: Router, private http:HttpClient) {}


  signInUser() {
    this.apiService.user$.pipe(first()).subscribe((users: User[]) => {
      const latestUser = users[users.length - 1];
      this.isAuthenticatedSubject.next(true);
      this.nameSubject.next(latestUser.userName);
      this.TypeSubject.next(latestUser.role);
      this.IdSubject.next(latestUser.id);
      this.EmailSubject.next(latestUser.email);
      this.PhoneNumberSubject.next(latestUser.phonenumber  ?? '');
      const addressDetails: AddressDetails = {
        street: latestUser.address?.street ?? '',
        city: latestUser.address?.city ?? '',
        state: latestUser.address?.state ?? '',
        country: latestUser.address?.country ?? '',
        postalcode: latestUser.address?.postalcode ?? ''
      };
      const address: Address[] = [addressDetails as Address];
      this.AddressSubject.next(address);
    });
  }


  signInOwner(selectedAccountType: string) {
    this.apiService.owner$.pipe(first()).subscribe((owners: Owner[]) => {
      const latestUser = owners[owners.length - 1];
      this.isAuthenticatedSubject.next(true);
      this.nameSubject.next(latestUser.username);
      this.TypeSubject.next(latestUser.role);
      this.IdSubject.next(latestUser.id);
      this.EmailSubject.next(latestUser.email);
      this.PhoneNumberSubject.next(latestUser.phonenumber  ?? '')
    });
  }

  signUp(selectedAccountType: string, email: string, password: string, username: string, firstname: string, lastname: string){
      const url = `${this.baseUrl}/auth/register`;
      const requestBody = {
        accountType: selectedAccountType,
        email,
        password,
        username,
        firstname,
        lastname,
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