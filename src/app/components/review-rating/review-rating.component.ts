import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartyHallService } from 'src/app/services/party-hall.service';
import { ReviewRatingService } from 'src/app/services/review-rating.service';
import { SlotService } from 'src/app/services/slot.service';

@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.css']
})
export class ReviewRatingComponent {
  id!: string;
  reviews: any[] = [];

  constructor(private reviewRatingService:ReviewRatingService, private partyHallService: PartyHallService, private slotService: SlotService, private router: Router) { }

  ngOnInit() {
    this.partyHallService.id$.subscribe(id => {
      this.id = id;
      console.log(`ID: ${this.id}`);
    });
    this.getReviews();
  }

  getReviews(): void {
    this.reviewRatingService.getReviews().subscribe(
      (response: any) => {
        console.log(response);
        this.reviews = response.filter((review: any) => review.partyHallId === this.id)
        .map((review: any) => ({
          rating: review.rating,
          reviewText: review.reviewText,
          // ownerReply: review.reply
        }));
        console.log(this.reviews);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
