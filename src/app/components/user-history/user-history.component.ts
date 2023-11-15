import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent{
  // userDetails!: User;
  // userId!: string;

  // constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  // ngOnInit() {
  //   this.userId = this.route.snapshot.paramMap.get('id');
  //   if (this.userId) {
  //     this.getDetails(this.userId);
  //   }
  // }

  // getDetails(id: string) {
  //   this.apiService.getUser(id).subscribe((data: User) => {
  //     this.userDetails = data;
  //   });
  // }
}