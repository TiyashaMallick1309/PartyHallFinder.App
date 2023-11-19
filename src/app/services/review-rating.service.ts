import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewRatingService {
  private reviewsUrl = 'https://localhost:7091/api/Reviews';

  constructor(private http: HttpClient) { }

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.reviewsUrl);
  }

  submitReview(feedback: any): Observable<any> {
    return this.http.post<any>(this.reviewsUrl, feedback);
  }
}
