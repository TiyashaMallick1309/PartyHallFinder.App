import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PartyHall } from 'src/app/models/party-hall';
import { Review } from 'src/app/models/review';
import { PartyHallService } from 'src/app/services/party-hall.service';
import { ReviewRatingService } from 'src/app/services/review-rating.service';
import { SlotService } from 'src/app/services/slot.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  rating!: number;
  review!: string;
  matchingHalls: PartyHall[] = [];
  partyHallId!: string;
  
  constructor(private router:Router, private slotService: SlotService, private partyHallService:PartyHallService, private reviewRatingService: ReviewRatingService){}

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('currentUser') || '{}')," in review")
    let userId = this.slotService.userId || '';
  if (!userId) {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      userId = JSON.parse(userData).id;
      this.slotService.setUserId(userId);
    }
  }
  this.getMatchingHalls(userId);
  }

  getMatchingHalls(userId: string) {
    this.slotService.getSlots().subscribe(slots => {
      const userBookings = slots.filter(slot => slot.userId == userId);
      const hallIds = userBookings.map(booking => booking.partyHallId);
      console.log(hallIds + ' id');
      console.log(userBookings + ' book')
  
      this.partyHallService.getPartyHalls().subscribe(halls => {
        this.matchingHalls = halls.filter(hall => hallIds.includes(hall.id));
        console.log(this.matchingHalls + ' halls');
        if (this.matchingHalls.length > 0) {
          this.partyHallId = this.matchingHalls[0].id;
        }
      });
    });
  }

  submitReviewForm(form: NgForm) {
    const review: Review = {
      id: '',
      userid: this.slotService.userId,
      partyhallid: this.partyHallId,
      reviewtext: form.value.review,
      rating: form.value.rating,
      date: new Date(),
      reply:''
    };
    this.reviewRatingService.submitReview(review).subscribe(res => {
      console.log(res);
    });
    window.alert("Feedback Submitted!");
    this.router.navigate(['user-dashboard/user-history']);
  }
}
