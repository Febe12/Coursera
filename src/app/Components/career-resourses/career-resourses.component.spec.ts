import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerResoursesComponent } from './career-resourses.component';

describe('CareerResoursesComponent', () => {
  let component: CareerResoursesComponent;
  let fixture: ComponentFixture<CareerResoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerResoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerResoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
