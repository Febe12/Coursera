import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerCourseDetailsComponent } from './career-course-details.component';

describe('CareerCourseDetailsComponent', () => {
  let component: CareerCourseDetailsComponent;
  let fixture: ComponentFixture<CareerCourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerCourseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
