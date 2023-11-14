import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHallBookingComponent } from './party-hall-booking.component';

describe('PartyHallBookingComponent', () => {
  let component: PartyHallBookingComponent;
  let fixture: ComponentFixture<PartyHallBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyHallBookingComponent]
    });
    fixture = TestBed.createComponent(PartyHallBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
