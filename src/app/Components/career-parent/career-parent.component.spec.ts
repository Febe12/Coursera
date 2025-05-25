import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerParentComponent } from './career-parent.component';

describe('CareerParentComponent', () => {
  let component: CareerParentComponent;
  let fixture: ComponentFixture<CareerParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
