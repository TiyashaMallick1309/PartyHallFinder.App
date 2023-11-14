import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit{
  users: User[]=[];

  constructor(private userService: UserService) { }

  ngOnInit() { 
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log('Users:', this.users);
    });
  }
}
