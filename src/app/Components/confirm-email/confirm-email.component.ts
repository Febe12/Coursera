import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  standalone: true,
  imports: [FormsModule,CommonModule],
})
export class ConfirmEmailComponent {
  email: string = '';
  code: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router,
      public userService:UserServiceService) {}

  // onSubmit() {
  //   this.authService.confirmEmail(this.email, this.code).subscribe({
  //     next: (response) => {
  //       // Save token
  //       this.authService.setToken(response.userToken);

  //       // Set dummy user
  //       const dummyUser = {
  //         username: this.email.split('@')[0],
  //         email: this.email
  //       };
  //       this.authService.setCurrentUser(dummyUser);

  //       // Navigate to home
  //       alert('✅ Email confirmed successfully!');
  //       this.router.navigate(['/home']);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.errorMessage = err.error?.message || 'Failed to confirm email.';
  //     }
  //   });
  // }



  // 
onSubmit() {
  this.authService.confirmEmail(this.email, this.code).subscribe({
    next: (response) => {
      this.authService.setToken(response.userToken);
      this.authService.setUserId(response.userId); // تقدر تشيليها لو مش هتستخدميها

      this.userService.getUserById().subscribe({
        next: (user) => {
          console.log('✔️ Confirmed user data:', user);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('❌ Error fetching user data:', err);
          this.errorMessage = 'Failed to load user data';
        }
      });
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = err.error?.message || 'Failed to confirm email.';
    }
  });
}




}