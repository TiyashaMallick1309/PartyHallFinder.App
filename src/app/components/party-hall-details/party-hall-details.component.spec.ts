import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHallDetailsComponent } from './party-hall-details.component';

describe('PartyHallDetailsComponent', () => {
  let component: PartyHallDetailsComponent;
  let fixture: ComponentFixture<PartyHallDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyHallDetailsComponent]
    });
    fixture = TestBed.createComponent(PartyHallDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
