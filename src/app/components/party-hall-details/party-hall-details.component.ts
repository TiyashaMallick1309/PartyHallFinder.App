import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PartyHallService } from 'src/app/services/party-hall.service';
// import {} from 'googlemaps';

@Component({
  selector: 'app-party-hall-details',
  templateUrl: './party-hall-details.component.html',
  styleUrls: ['./party-hall-details.component.css']
})
export class PartyHallDetailsComponent {
  partyHall: any;
  currentImageIndex=0;
  src: any;
  images: any;

  constructor(public partyHallService: PartyHallService, private route: ActivatedRoute, private auth: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
    const partyHallIdParam = this.route.snapshot.paramMap.get('id');
    if (partyHallIdParam !== null) {
      const partyHallId = partyHallIdParam;
      console.log(partyHallId);
      if (partyHallId) {
        this.partyHallService.getPartyHall(partyHallId).subscribe((res: any) => {
          console.log(res);
          this.partyHall = res;
          this.images = this.partyHall.images;
          this.currentImageIndex = Math.floor(Math.random() * this.images.length);
          this.src = this.images[this.currentImageIndex];
        });
      } else {
        console.error("Invalid Party Hall ID");
      }
    } else {
      console.error("Party Hall ID id missing");
    }
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

  savedHalls(partyHall : any) {
    this.partyHallService.savedHalls(partyHall);
    alert("Party Hall saved!");
}

}