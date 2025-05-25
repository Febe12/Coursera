import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../Services/user-service.service';
import { Iuser } from '../../Models/iuser';

@Component({
  selector: 'app-edit-form-dialog',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './edit-form-dialog.component.html',
  styleUrl: './edit-form-dialog.component.scss'
})
export class EditFormDialogComponent {
  userData: any;
  updatedUserData: Partial<Iuser> = {};  // to store the updated data of the user

  constructor(public authService: AuthService, private router: Router, public userService: UserServiceService) {}

  ngOnInit(): void {
    this.userService.getUserById().subscribe((res: any) => {
      this.userData = res.data;  // get the current user
      this.updatedUserData = { ...this.userData };  //paste the updated date
    });
  }

  // user update
  updateUserData() {
    //change the values of the firstName and the last Name according to the username
    if (this.updatedUserData.username) {
      const parts = this.updatedUserData.username.trim().split(' ');
      this.updatedUserData.firstName = parts[0];  // take the fisrt part of the name
      this.updatedUserData.lastName = parts.slice(1).join(' ');  // take the second part of the name
    }

    const updatePayload = {
      username:this.updatedUserData.username,
      firstName: this.updatedUserData.firstName,
      lastName: this.updatedUserData.lastName,
      location: this.updatedUserData.location,
      gender: this.updatedUserData.gender,
      phone:this.updatedUserData.phone
    };

    this.userService.updateUser(updatePayload).subscribe({
      next: (res) => {
        // alert('User updated successfully!');
        window.location.reload();
      },
      error: (err) => {
        console.error('Update failed:', err);
        // alert('Failed to update user info.');
      }
    });
  }
}
