import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, switchMap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import {first, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private baseURL = environment.apiUrl;
   isAuthenticatedSubject :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   userTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   userIdSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
   userEmailSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  constructor(private apiService: ApiService, private router: Router, private http:HttpClient) {}

  signIn(selectedAccountType: string) {
    console.log(this.isAuthenticatedSubject + " beforethe apiservice call")
    this.apiService.user$.pipe(first()).subscribe((users:User[])=>{
      const latestUser = users[users.length-1];
      this.isAuthenticatedSubject.next(true);
      this.usernameSubject.next(latestUser.username);
      this.userTypeSubject.next(latestUser.role);
      this.userIdSubject.next(latestUser._id);
      this.router.navigate(['']);
    });
    console.log(this.isAuthenticatedSubject+" after");
  }


  signUp(selectedAccountType: string, email: string, password: string, username: string, firstname: string, lastname: string){
      const url = `${this.baseURL}/auth/register`;
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
          return throwError('Error while authenticating user');
        })
      );
  }
}