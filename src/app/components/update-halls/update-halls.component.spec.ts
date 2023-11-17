import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHallsComponent } from './update-halls.component';

describe('UpdateHallsComponent', () => {
  let component: UpdateHallsComponent;
  let fixture: ComponentFixture<UpdateHallsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHallsComponent]
    });
    fixture = TestBed.createComponent(UpdateHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
