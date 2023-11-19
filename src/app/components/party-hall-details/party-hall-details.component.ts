import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-party-hall-details',
  templateUrl: './party-hall-details.component.html',
  styleUrls: ['./party-hall-details.component.css']
})
export class PartyHallDetailsComponent implements OnInit {
  partyHall: any;
  currentImageIndex = 0;
  src: any;
  images: any;

  private map!: L.Map;
  private centroid: L.LatLngExpression = [0, 0];

  constructor(public partyHallService: PartyHallService, private route: ActivatedRoute, private auth: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
    const partyHallIdParam = this.route.snapshot.paramMap.get('id');
    if (partyHallIdParam !== null) {
      const partyHallId = partyHallIdParam;
      console.log(partyHallId);
      if (partyHallId) {
        this.initMap();
        this.partyHallService.getPartyHall(partyHallId).subscribe((res: any) => {
          this.partyHall = res;
          this.images = this.partyHall.images;
          this.currentImageIndex = Math.floor(Math.random() * this.images.length);
          this.src = this.images[this.currentImageIndex];

          // Update the centroid with the latitude and longitude from the party hall data
          this.centroid = [this.partyHall.geolocation.longitude,this.partyHall.geolocation.latitude];

          // Define your icon 
          const icon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',  // Change this to the location of marker-icon.png in your project if needed
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // Change this to the location of marker-shadow.png in your project if needed
            iconSize: [25, 41], // size of the icon
            shadowSize: [41, 41], // size of the shadow
            iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            shadowAnchor: [14, 41],  // the same for the shadow
            popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
          });

          // Add a marker to the map using the latitude and longitude from the party hall data
          const marker = L.marker(this.centroid, { icon: icon });
          marker.addTo(this.map);

          // Center the map on the marker's location
          const markerBounds = L.latLngBounds([this.centroid]);
          this.map.fitBounds(markerBounds);
        });
      } else {
        console.error("Invalid Party Hall ID");
      }
    } else {
      console.error("Party Hall ID id missing");
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 0,
      attribution: '© OpenStreetMap'
    });

    tiles.addTo(this.map);
  }

  logout() {
    this.auth.isAuthenticatedSubject.next(false);
    this.auth.TypeSubject.next('');
    this.auth.nameSubject.next('');
    this.router.navigate(['/'])
  }

  onNextClick() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.src = this.images[this.currentImageIndex];
  }

  onPrevClick() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.src = this.images[this.currentImageIndex];
  }

  savedHalls(partyHall: any) {
    this.partyHallService.savedHalls(partyHall);
    alert("Party Hall saved!");
  }

  bookHall() {
    // Pass the id to the service
    this.partyHallService.setId(this.partyHall.id);
    this.router.navigate([`/user-dashboard/party-hall-list/${this.partyHall.id}/book`])
  }
}
