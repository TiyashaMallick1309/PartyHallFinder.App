import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadHallsComponent } from './upload-halls.component';

describe('UploadHallsComponent', () => {
  let component: UploadHallsComponent;
  let fixture: ComponentFixture<UploadHallsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadHallsComponent]
    });
    fixture = TestBed.createComponent(UploadHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
