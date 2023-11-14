import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor() {}

  async signIn(accountType: string, email: string, password: string): Promise<void> {
    try {
      // You can implement your own authentication logic here
      // and optionally handle account type and user data
    } catch (error) {
      throw error;
    }
  }

  async signUp(accountType: string, email: string, password: string): Promise<void> {
    try {
      // You can implement your own authentication logic here
      // and optionally handle account type and user data
    } catch (error) {
      throw error;
    }
  }
  
}