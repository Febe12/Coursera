import { TestBed } from '@angular/core/testing';

import { CoursesGroupService } from './courses-group.service';

describe('CoursesGroupService', () => {
  let service: CoursesGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
