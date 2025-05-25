import { TestBed } from '@angular/core/testing';

import { ServiceWithApiService } from './service-with-api.service';

describe('ServiceWithApiService', () => {
  let service: ServiceWithApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceWithApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
