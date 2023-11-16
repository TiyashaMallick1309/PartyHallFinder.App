import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent {
  users: User[] = [];
  searchText: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  filteredUsers: any[] = [];
  filterOptions: any = {
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    phonenumber: ''
  };

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((result: User[]) => {
      this.users = result;

      this.filteredUsers = this.users.slice();
    });
  }

  filterUsers() {
    this.currentPage = 1;

    if (this.filterOptions.firstname || this.filterOptions.lastname ||
      this.filterOptions.email || this.filterOptions.role ||
      this.filterOptions.phonenumber) {
      this.filterUsersWithFilterOptions();
      return;
    }

    const searchText = this.searchText.toLowerCase();

    if (searchText) {
      this.filteredUsers = this.users.filter((user) => {
        return user && Object.values(user).some((value) => {
          if (typeof value == 'object' && value !== null) {
            return Object.values(value).some((subValue: any) =>
              subValue.toString().toLowerCase().includes(searchText)
            );
          }
          return value && value.toString().toLowerCase().includes(searchText);
        });
      });
    } else {
      this.filteredUsers = this.users.slice();
    }
  }

  filterUsersWithFilterOptions() {
    const firstname = this.filterOptions.firstname.toLowerCase(); const lastname = this.filterOptions.lastname.toLowerCase(); const email = this.filterOptions.email.toLowerCase(); const role = this.filterOptions.role.toLowerCase(); const phonenumber = this.filterOptions.phonenumber.toLowerCase();

    this.filteredUsers = this.users.filter((user) => {
      return (firstname ?
        user.firstname.toString().toLowerCase().includes(firstname)
        : true) &&
        (lastname ?
          user.lastname.toString().toLowerCase().includes(lastname)
          : true) &&
        (email ?
          user.email.toString().toLowerCase().includes(email)
          : true) &&
        (role ?
          user.role.toString().toLowerCase().includes(role)
          : true) &&
        (phonenumber ?
          user.phonenumber.toString().toLowerCase().includes(phonenumber)
          : true);
    });
  }

  // Methods for pagination 
  setPage(page: number) { this.currentPage = page; }

  previousPage() { if (this.currentPage > 1) { this.currentPage--; } }

  nextPage() { if (this.currentPage < this.totalPages) { this.currentPage++; } }

  get totalPages(): number { return Math.ceil(this.filteredUsers.length / this.pageSize); }

  get pages(): number[] { const pages = []; for (let i = 1; i <= this.totalPages; i++) { pages.push(i); } return pages; }

  applyFilter(filterType: string, filterValue: string): void {
    this.currentPage = 1;

    switch (filterType) {
      case 'firstname':
        this.filterOptions.firstname = filterValue.toLowerCase();
        break;
      case 'lastname':
        this.filterOptions.lastname = filterValue.toLowerCase();
        break;
      case 'email':
        this.filterOptions.email = filterValue.toLowerCase();
        break;
      case 'role':
        this.filterOptions.role = filterValue.toLowerCase();
        break;
      case 'phonenumber':
        this.filterOptions.phonenumber = filterValue.toLowerCase();
        break;
    }

    this.filterUsers();
  }
}