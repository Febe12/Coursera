import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCourseraComponent } from './explore-coursera.component';

describe('ExploreCourseraComponent', () => {
  let component: ExploreCourseraComponent;
  let fixture: ComponentFixture<ExploreCourseraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreCourseraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreCourseraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
