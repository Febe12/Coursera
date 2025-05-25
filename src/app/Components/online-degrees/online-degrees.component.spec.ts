import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineDegreesComponent } from './online-degrees.component';

describe('OnlineDegreesComponent', () => {
  let component: OnlineDegreesComponent;
  let fixture: ComponentFixture<OnlineDegreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineDegreesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineDegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
