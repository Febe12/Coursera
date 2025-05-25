import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutNavbarComponent } from './out-navbar.component';

describe('OutNavbarComponent', () => {
  let component: OutNavbarComponent;
  let fixture: ComponentFixture<OutNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
