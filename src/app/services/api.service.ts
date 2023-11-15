import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user$!: Observable<User[]>;
  owner$!: Observable<Owner[]>;

  enteredPassword: string = '';
  existingPassword: string = '';

  constructor(private http: HttpClient) { }

  addUser(userdata: any) {
    userdata.password = userdata.password;
    return this.http.post('https://localhost:7091/api/Users', userdata);
  }
  addOwner(ownerdata: any) {
    ownerdata.password = ownerdata.password;
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

  comparePasswords(enteredPassword: string, storedPassword: string): boolean {
    return enteredPassword === storedPassword;
  }


}
