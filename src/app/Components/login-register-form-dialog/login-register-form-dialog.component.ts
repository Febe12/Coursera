import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Iuser } from '../../Models/iuser';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-login-register-form-dialog',
  templateUrl: './login-register-form-dialog.component.html',
  styleUrls: ['./login-register-form-dialog.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, ConfirmEmailComponent],
})
export class LoginRegisterFormDialogComponent implements AfterViewInit {

  // They store the data that the user enters in the login form.
  loginEmail: string = '';
  loginPassword: string = '';
// To access the item named confirmEmailDialog
  @ViewChild('confirmEmailDialog') confirmEmailDialog!: any;
// An object representing a new user who will register on the website. It contains his data.
  registerUser: Iuser = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  userImage: '',
  location: '',
  gender: '',
    dob: new Date(),
    // myLearning: [],
    progress: {
      progressCourses: []
    }
  };

  constructor(
    public authService: AuthService,
    private router: Router,
    public userService:UserServiceService
  ) {}

  ngAfterViewInit(): void {
    // nothing needed here for now
  }
//



login() {
  this.authService.login(this.loginEmail, this.loginPassword).subscribe({
    next: (response) => {
      this.authService.setToken(response.userToken);
      this.authService.setUserId(response.userId); // لو مش محتاجاه ممكن تشيليه

      this.userService.getUserById().subscribe({
        next: (user) => {
          console.log(' user data:', user);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        }
      });
    },
    error: (err) => {
      alert('Invalid email or password');
      console.error(err);
    }
  });
}




//



  // login() {
  //   this.authService.login(this.loginEmail, this.loginPassword).subscribe({
  //     next: (response) => {
  //       // Save token
  //       this.authService.setToken(response.userToken);//Here we hold and store the token because i acces that from the coming response

  //       // Create dummy user for display
  //       const dummyUser: Iuser = {
  //         username: this.loginEmail.split('@')[0],
  //         email: this.loginEmail,
  //         password: '',
  //         firstName: '',
  //         lastName: '',
  //          userImage: '',
  // location: '',
  // gender: '',
  //         // myLearning: [],
  //         progress: {
  //           progressCourses: []
  //         }
  //       };

  //       // Set current user
  //       this.authService.setCurrentUser(dummyUser);

  //       // Navigate to home if the user that logged in in the data base
  //       this.router.navigate(['/home']);
  //     },
  //     error: (err) => {
  //       alert('Invalid email or password');
  //       console.error(err);
  //     }
  //   });
  // }

  register() {

    // this.registerUser.username was undefined at the moment .trim() was called for this i make the condition
   if (this.registerUser?.username) {
    const nameParts = this.registerUser.username.trim().split(' ');
    this.registerUser.firstName = nameParts[0] || '';
    this.registerUser.lastName = nameParts.slice(1).join(' ') || '';
  }
    this.authService.register(this.registerUser).subscribe({
      next: (response) => {
        // alert('Registration successful! Please check your email for a confirmation code.');
        setTimeout(() => {
          const dialog = document.getElementById('confirmEmail') as HTMLDialogElement;
          dialog?.showModal();
        }, 0);
      },
      error: (err) => {
        console.error('Registration error:', err);
        if (err.status === 409) {
          alert(`This email is already taken. Try logging in.`);
        } else if (err.status === 400) {
          alert('Please fill out all required fields correctly.');
        } else {
          alert('Something went wrong. Please try again later.');
        }
      }
    });
  }
}
