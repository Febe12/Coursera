import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetalisComponent } from './home-detalis.component';

describe('HomeDetalisComponent', () => {
  let component: HomeDetalisComponent;
  let fixture: ComponentFixture<HomeDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDetalisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
