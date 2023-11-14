export class PartyHall {
    id?: string;
    name: string = "";
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalcode: string;
    } = {
            street: "",
            city: "",
            state: "",
            country: "",
            postalcode: "",
        };
    capacity: number = 0;
    amenities: string[] = [];
    pricing: {
        perHour: number;
        perDay: number;
        perWeek: number;
    } = {
            perHour: 0,
            perDay: 0,
            perWeek: 0
        };
    availability: {
        startDateTime: Date;
        endDateTime: Date;
        range: string;
    } = {
            startDateTime: new Date(),
            endDateTime: new Date(),
            range: ''
        };
    images: string[] = [];
}

<!-- Location Dropdown -->
<div class="dropdown mr-3">
  <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown">
    Location
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" (click)="applyFilter('location', 'Edinburgh')">Edinburgh</a>
    <a class="dropdown-item" (click)="applyFilter('location', 'Scotland')">Scotland</a>
    <a class="dropdown-item" (click)="applyFilter('location', 'United Kingdom')">United Kingdom</a>
  </div>
</div>

<!-- Capacity Dropdown -->
<div class="dropdown mr-3">
  <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown">
    Capacity
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" (click)="applyFilter('capacity', 'Small (0-200)')">Small (0-200)</a>
    <a class="dropdown-item" (click)="applyFilter('capacity', 'Medium (201-500)')">Medium (201-500)</a>
    <a class="dropdown-item" (click)="applyFilter('capacity', 'Large (501+)')">Large (501+)</a>
  </div>
</div>

<!-- Amenities Dropdown -->
<div class="dropdown mr-3">
  <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown">
    Amenities
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" (click)="applyFilter('amenities', 'WiFi')">WiFi</a>
    <a class="dropdown-item" (click)="applyFilter('amenities', 'Audiovisual Equipment')">Audiovisual Equipment</a>
    <a class="dropdown-item" (click)="applyFilter('amenities', 'Dedicated Events Team')">Dedicated Events Team</a>
    <a class="dropdown-item" (click)="applyFilter('amenities', 'Onsite Catering')">Onsite Catering</a>
    <a class="dropdown-item" (click)="applyFilter('amenities', 'Accessible Facilities')">Accessible Facilities</a>
  </div>
</div>

<!-- Availability Dropdown -->
<div class="dropdown mr-3">
  <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown">
    Availability
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" (click)="applyFilter('availability', 'Weekdays')">Weekdays</a>
    <a class="dropdown-item" (click)="applyFilter('availability', 'Weekends')">Weekends</a>
    <a class="dropdown-item" (click)="applyFilter('availability', 'Anytime')">Anytime</a>
  </div>
</div>

<!-- Budget Dropdown -->
<div class="dropdown mr-3">
  <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown">
    Budget
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" (click)="applyFilter('budget', 'Low (0-500)')">Low (0-500)</a>
    <a class="dropdown-item" (click)="applyFilter('budget', 'Medium (501-2000)')">Medium (501-2000)</a>
    <a class="dropdown-item" (click)="applyFilter('budget', 'High (2001+)')">High (2001+)</a>
  </div>
</div>








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
    case 'availability':
      this.filterOptions.availability = filterValue.toLowerCase();
      break;
    case 'budget':
      this.filterOptions.budget = filterValue.toLowerCase();
      break;
  }

  this.filterPartyHalls();
}
