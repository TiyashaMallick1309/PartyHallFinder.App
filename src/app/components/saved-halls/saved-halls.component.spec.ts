import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedHallsComponent } from './saved-halls.component';

describe('SavedHallsComponent', () => {
  let component: SavedHallsComponent;
  let fixture: ComponentFixture<SavedHallsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedHallsComponent]
    });
    fixture = TestBed.createComponent(SavedHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
