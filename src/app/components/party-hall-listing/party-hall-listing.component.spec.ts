import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHallListingComponent } from './party-hall-listing.component';

describe('PartyHallListingComponent', () => {
  let component: PartyHallListingComponent;
  let fixture: ComponentFixture<PartyHallListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyHallListingComponent]
    });
    fixture = TestBed.createComponent(PartyHallListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
