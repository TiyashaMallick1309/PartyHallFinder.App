import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
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


  signInUser(user:User) {
      this.isAuthenticatedSubject.next(true);
      this.nameSubject.next(user.userName);
      this.TypeSubject.next(user.role);
      this.IdSubject.next(user.id);
      this.EmailSubject.next(user.email);
      this.PhoneNumberSubject.next(user.phonenumber  ?? '');
      const addressDetails: AddressDetails = {
        street: user.address?.street ?? '',
        city: user.address?.city ?? '',
        state: user.address?.state ?? '',
        country: user.address?.country ?? '',
        postalcode: user.address?.postalcode ?? ''
      };
      const address: Address[] = [addressDetails as Address];
      this.AddressSubject.next(address);
  }


  signInOwner(selectedAccountType: string, owner: Owner) {
      this.isAuthenticatedSubject.next(true);
      this.nameSubject.next(owner.username);
      this.TypeSubject.next(owner.role);
      this.IdSubject.next(owner.id);
      this.EmailSubject.next(owner.email);
      this.PhoneNumberSubject.next(owner.phonenumber  ?? '');
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