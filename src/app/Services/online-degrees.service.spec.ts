import { TestBed } from '@angular/core/testing';

import { OnlineDegreesService } from './online-degrees.service';

describe('OnlineDegreesService', () => {
  let service: OnlineDegreesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineDegreesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
