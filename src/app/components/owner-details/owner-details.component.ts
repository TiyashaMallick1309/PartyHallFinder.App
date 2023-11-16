import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit{
  name!: string;
  email!: string;
  phonenumber :string = '';

  constructor(private authService: AuthorizationService, private apiService: ApiService) { }

  ngOnInit() {
    this.authService.isAuthenticatedSubject.pipe(filter(isAuthenticated => isAuthenticated)).subscribe(() => {
      this.authService.nameSubject.subscribe(name => {
        // console.log('name: ', name); 
        this.name = name;
      });
      this.authService.TypeSubject.subscribe(role => {
        // console.log('role: ', role); this.role = role; 
      });
      this.authService.EmailSubject.subscribe(email => {
        // console.log('email: ', email); 
        this.email = email;
      });
      this.authService.PhoneNumberSubject.subscribe(phonenumber  => {
        console.log('phonenumber: ', phonenumber );
        this.phonenumber  = phonenumber ;
      });
    });
  }
}