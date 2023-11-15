import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PasswordHashService } from './password-hash.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user$!: Observable<User[]>;

  enteredPassword: string = '';
  hashedPassword: string = '';

  constructor(private database: HttpClient, private passwordHashService: PasswordHashService) { }

  addUser(userdata: any) {
    const hashedPassword = this.passwordHashService.hashPassword(userdata.password);
    userdata.password = hashedPassword;
    console.log(userdata);
    return this.database.post('https://localhost:7091/api/Users', userdata);
  }

  getAllUsers(): Observable<User[]> {
    this.user$ = this.database.get<User[]>('https://localhost:7091/api/Users');
    return this.user$;
  }

  getUser(userId: string): Observable<User> {
    return this.database.get<User>(`https://localhost:7091/api/Users/${userId}`);
  }

  comparePasswords(enteredPassword:string,hashedPassword:string):boolean{
    const hashedEnteredPassword = this.passwordHashService.hashPassword(enteredPassword);
    return hashedEnteredPassword === hashedPassword;
  }
}
