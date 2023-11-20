import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Owner } from '../models/owner';
import { PasswordHashingService } from './password-hashing.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  user$!: Observable<User[]>;
  owner$!: Observable<Owner[]>;

  password        : string='';
  hashedPassword  : string='';

  constructor(private http: HttpClient,private passwordHashService:PasswordHashingService) { }

  addUser(userdata: any) {
    const hashedPassword = this.passwordHashService.hashPassword(userdata.password);
    userdata.password=hashedPassword;
    return this.http.post('https://localhost:7091/api/Users', userdata);
  }
  addOwner(ownerdata: any) {
    const hashedPassword = this.passwordHashService.hashPassword(ownerdata.password);
    ownerdata.password=hashedPassword;
    return this.http.post('https://localhost:7091/api/Owners', ownerdata);
  }


  getUsers(): Observable<User[]> {
    this.user$ = this.http.get<User[]>('https://localhost:7091/api/Users');
    return this.user$;
  }
  getOwners(): Observable<Owner[]> {
    this.owner$ = this.http.get<Owner[]>('https://localhost:7091/api/Owners');
    return this.owner$;
  }


  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`https://localhost:7091/api/Users/${userId}`);
  }

  comparePasswords(enteredPassword:string,hashedPassword:string):boolean{
    const hashedEnteredPassword = this.passwordHashService.hashPassword(enteredPassword);
    return hashedEnteredPassword == hashedPassword;
  }


}
