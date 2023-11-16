import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ApiService } from 'src/app/services/api.service';
import { filter} from 'rxjs';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  name!: string;
  email!: string;
  phonenumber :string = '';
  address: Address[] = [];

  constructor(private authService: AuthorizationService, private apiService: ApiService) { }

  ngOnInit() {
    this.authService.isAuthenticatedSubject.pipe(filter(isAuthenticated => isAuthenticated)).subscribe(() => {
      this.authService.nameSubject.subscribe(name => {
        // console.log('name: ', name); 
        this.name = name;
      });
      this.authService.EmailSubject.subscribe(email => {
        // console.log('email: ', email); 
        this.email = email;
      });
      this.authService.PhoneNumberSubject.subscribe(phonenumber  => {
        // console.log('phonenumber: ', phonenumber );
        this.phonenumber  = phonenumber ;
      });
      this.authService.AddressSubject.subscribe(address => {
        this.address = address;
      });
    });
  }
}