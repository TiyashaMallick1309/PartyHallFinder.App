import { TestBed } from '@angular/core/testing';

import { PasswordHashService } from './password-hash.service';

describe('PasswordHashService', () => {
  let service: PasswordHashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordHashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
