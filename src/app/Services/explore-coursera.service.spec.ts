import { TestBed } from '@angular/core/testing';

import { ExploreCourseraService } from './explore-coursera.service';

describe('ExploreCourseraService', () => {
  let service: ExploreCourseraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreCourseraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
