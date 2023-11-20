import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
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
   firstNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   lastNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   nameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   TypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   IdSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
   EmailSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   AddressSubject: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);
   phonenumberSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private apiService: ApiService, 
    private router: Router, 
    private http:HttpClient
  ) { }

  signInUser(user: User) {
    this.isAuthenticatedSubject.next(true);
    this.firstNameSubject.next(user.firstName);
    this.lastNameSubject.next(user.lastName);
    this.nameSubject.next(user.userName);
    this.TypeSubject.next(user.role);
    this.IdSubject.next(user.id);
    this.EmailSubject.next(user.email);
    this.phonenumberSubject.next(user.phonenumber ?? '');
    const addressDetails: AddressDetails = {
      street: user.address?.street ?? '',
      city: user.address?.city ?? '',
      state: user.address?.state ?? '',
      country: user.address?.country ?? '',
      postalcode: user.address?.postalcode ?? ''
    };
    const address: Address[] = [addressDetails as Address];
    this.AddressSubject.next(address);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
  }

  signInOwner(selectedAccountType: string, owner: Owner) {
    this.isAuthenticatedSubject.next(true);
    this.nameSubject.next(owner.username);
    this.TypeSubject.next(owner.role);
    this.IdSubject.next(owner.id);
    this.EmailSubject.next(owner.email);
    this.phonenumberSubject.next(owner.phonenumber ?? '');
    localStorage.setItem('currentOwner', JSON.stringify(owner));
    localStorage.setItem('isLoggedIn', 'true');
  }

  signUp(selectedAccountType: string, email: string, password: string, username: string, firstName: string, lastName: string){
    const url = `${this.baseUrl}/auth/register`;
    const requestBody = {
      accountType: selectedAccountType,
      email,
      password,
      username,
      firstName,
      lastName,
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