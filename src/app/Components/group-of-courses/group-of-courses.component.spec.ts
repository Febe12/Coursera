import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOfCoursesComponent } from './group-of-courses.component';

describe('GroupOfCoursesComponent', () => {
  let component: GroupOfCoursesComponent;
  let fixture: ComponentFixture<GroupOfCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupOfCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupOfCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
