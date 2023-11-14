import { TestBed } from '@angular/core/testing';

import { PartyHallService } from './party-hall.service';

describe('PartyHallService', () => {
  let service: PartyHallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyHallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
