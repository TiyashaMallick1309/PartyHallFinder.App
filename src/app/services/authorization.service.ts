import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import {first} from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Owner } from '../models/owner';

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
  
  constructor(private apiService: ApiService, private router: Router, private http:HttpClient) {}

  signInUser(selectedAccountType: string) {
    this.apiService.user$.pipe(first()).subscribe((users:User[])=>{
      const latestUser = users[users.length-1];
      this.isAuthenticatedSubject.next(true);
      this.nameSubject.next(latestUser.userName);
      this.TypeSubject.next(latestUser.role);
      this.IdSubject.next(latestUser._id);

    });
  }

  signInOwner(selectedAccountType: string) {
    this.apiService.owner$.pipe(first()).subscribe((owners:Owner[])=>{
      const latestOwner = owners[owners.length-1];
      this.isAuthenticatedSubject.next(true);
      this.nameSubject.next(latestOwner.username);
      this.TypeSubject.next(latestOwner.role);
      this.IdSubject.next(latestOwner._id);
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