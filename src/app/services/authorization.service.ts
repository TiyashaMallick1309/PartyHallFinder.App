import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  signIn(selectedAccountType: string, email: string, password: string) {
    const url = `${this.baseURL}/auth/login`;
    const requestBody = {
      accountType: selectedAccountType,
      email,
      password,
    };

    return this.http
      .post(url, requestBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError('Error while authenticating user');
        })
      );
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