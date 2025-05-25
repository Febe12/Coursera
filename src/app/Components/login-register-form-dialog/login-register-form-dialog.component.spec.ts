import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterFormDialogComponent } from './login-register-form-dialog.component';

describe('LoginRegisterFormDialogComponent', () => {
  let component: LoginRegisterFormDialogComponent;
  let fixture: ComponentFixture<LoginRegisterFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegisterFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
