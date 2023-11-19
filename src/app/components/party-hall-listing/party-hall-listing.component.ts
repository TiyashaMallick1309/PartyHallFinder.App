import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartyHall } from 'src/app/models/party-hall';
import { PartyHallService } from 'src/app/services/party-hall.service';

@Component({
  selector: 'app-party-hall-listing',
  templateUrl: './party-hall-listing.component.html',
  styleUrls: ['./party-hall-listing.component.css']
})
export class PartyHallListingComponent {
  partyHalls: PartyHall[] = [];
  searchText: string = '';
  pageSize: number = 9;
  currentPage: number = 1;
  filteredPartyHalls: any[] = [];
  filterOptions: any = {
    location: '',
    capacity: '',
    amenities: '',
    budget: ''
  };

  constructor(public partyhallService: PartyHallService, private router: Router) { }

  ngOnInit(): void {
    this.partyhallService.getPartyHalls().subscribe((result: PartyHall[]) => {
      this.partyHalls = result; // assign the result to partyHalls
      this.filteredPartyHalls = this.partyHalls.slice();
    })
  }

  filterPartyHalls() {
    this.currentPage = 1;

    if (this.filterOptions.location || this.filterOptions.capacity ||
      this.filterOptions.amenities ||  this.filterOptions.budget) {
      this.filterPartyHallsWithFilterOptions();
      return;
    }

    const searchText = this.searchText.toLowerCase();

    if (searchText) {
      this.filteredPartyHalls = this.partyHalls.filter((partyHall) => {
        return Object.values(partyHall).some((value) => {
          if (typeof value === 'object') {
            return Object.values(value).some((subValue: any) =>
              subValue.toString().toLowerCase().includes(searchText)
            );
          }
          return value.toString().toLowerCase().includes(searchText);
        });
      });
    } else {
      this.filteredPartyHalls = this.partyHalls.slice();
    }
  }

  filterPartyHallsWithFilterOptions() {
    const location = this.filterOptions.location.toLowerCase();
    const capacity = this.filterOptions.capacity.toLowerCase();
    const amenities = this.filterOptions.amenities.toLowerCase();
    const budget = this.filterOptions.budget.toLowerCase();

    this.filteredPartyHalls = this.partyHalls.filter((partyHall) => {
      return (location ?
        Object.values(partyHall.address).some((value) =>
          value.toString().toLowerCase().includes(location)
        ) : true) &&
        (capacity ? partyHall.capacity.toString().toLowerCase().includes(capacity) : true) &&
        (amenities ? partyHall.amenities.some((amenity) => amenity.toLowerCase().includes(amenities)) : true) &&
        (budget ? Object.values(partyHall.pricing).some((value) =>
          value.toString().toLowerCase().includes(budget)
        ) : true);
    });
  }

  // Method to handle errors when loading party hall images
  handleImageError(event: Event): void {
    console.error("Image error: ", event);
  }

  // Methods for pagination
  setPage(page: number) {
    this.currentPage = page;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPartyHalls.length / this.pageSize);
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  applyFilter(filterType: string, filterValue: string): void {
    this.currentPage = 1;

    switch (filterType) {
      case 'location':
        this.filterOptions.location = filterValue.toLowerCase();
        break;
      case 'capacity':
        this.filterOptions.capacity = filterValue.toLowerCase();
        break;
      case 'amenities':
        this.filterOptions.amenities = filterValue.toLowerCase();
        break;
      case 'budget':
        this.filterOptions.budget = filterValue.toLowerCase();
        break;
    }

    this.filterPartyHalls();
  }

  openPartyHallDetails(partyHall: PartyHall) {
    console.log(partyHall);
    if (partyHall && partyHall.id) {
      this.router.navigate(['/user-dashboard/party-hall-list', partyHall.id]);
    }
  }

}