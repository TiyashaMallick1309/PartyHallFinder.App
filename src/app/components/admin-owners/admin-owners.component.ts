import { Component } from '@angular/core';
import { Owner } from 'src/app/models/owner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-owners',
  templateUrl: './admin-owners.component.html',
  styleUrls: ['./admin-owners.component.css']
})
export class AdminOwnersComponent {
  owners: Owner[] = [];
  searchText: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  filteredOwners: any[] = [];
  filterOptions: any = {
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    phonenumber: ''
  };

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getOwners().subscribe((result: Owner[]) => {
      this.owners = result;

      this.filteredOwners = this.owners.slice();
    });
  }

  filterOwners() {
    this.currentPage = 1;

    if (this.filterOptions.firstname || this.filterOptions.lastname ||
      this.filterOptions.email || this.filterOptions.role ||
      this.filterOptions.phonenumber) {
      this.filterOwnersWithFilterOptions();
      return;
    }

    const searchText = this.searchText.toLowerCase();

    if (searchText) {
      this.filteredOwners = this.owners.filter((owner) => {
        return owner && Object.values(owner).some((value) => {
          if (typeof value == 'object' && value !== null) {
            return Object.values(value).some((subValue: any) =>
              subValue.toString().toLowerCase().includes(searchText)
            );
          }
          return value && value.toString().toLowerCase().includes(searchText);
        });
      });
    } else {
      this.filteredOwners = this.owners.slice();
    }
  }

  filterOwnersWithFilterOptions() {
    const firstname = this.filterOptions.firstname.toLowerCase(); const lastname = this.filterOptions.lastname.toLowerCase(); const email = this.filterOptions.email.toLowerCase(); const role = this.filterOptions.role.toLowerCase(); const phonenumber = this.filterOptions.phonenumber.toLowerCase();

    this.filteredOwners = this.owners.filter((owner) => {
      return (firstname ?
        owner.firstname.toString().toLowerCase().includes(firstname)
        : true) &&
        (lastname ?
          owner.lastname.toString().toLowerCase().includes(lastname)
          : true) &&
        (email ?
          owner.email.toString().toLowerCase().includes(email)
          : true) &&
        (role ?
          owner.role.toString().toLowerCase().includes(role)
          : true) &&
        (phonenumber ?
          owner.phonenumber.toString().toLowerCase().includes(phonenumber)
          : true);
    });
  }

  // Methods for pagination 
  setPage(page: number) { this.currentPage = page; }

  previousPage() { if (this.currentPage > 1) { this.currentPage--; } }

  nextPage() { if (this.currentPage < this.totalPages) { this.currentPage++; } }

  get totalPages(): number { return Math.ceil(this.filteredOwners.length / this.pageSize); }

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

    this.filterOwners();
  }
}