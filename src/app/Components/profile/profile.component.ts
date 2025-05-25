import { Component, OnInit } from '@angular/core';
import { EditFormDialogComponent } from '../edit-form-dialog/edit-form-dialog.component';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { CredentialDialogComponent } from '../credential-dialog/credential-dialog.component';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../Services/user-service.service';
import { Navbar2Component } from '../navbar2/navbar2.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShareProfileComponent } from '../share-profile/share-profile.component';
import { ProfileVisibilityComponent } from '../profile-visibility/profile-visibility.component';

@Component({
  selector: 'app-profile',
  imports: [ProfileVisibilityComponent,ShareProfileComponent,NavbarComponent,EditFormDialogComponent,ProjectDialogComponent,CredentialDialogComponent,RouterModule,FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

    // userName: string | null = null;//to display the username  of the user 
    userData: any;
    constructor(public authService: AuthService, private router: Router,public userService :UserServiceService) {}
    ngOnInit(): void {
     this.userService.getUserById().subscribe((res: any) => {
    // console.log(" Current  user form the career page :", res);
    this.userData = res.data; //here will be the user
  });
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/']); // Redirect to landing page the default route after logout
    }

}
