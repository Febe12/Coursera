import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../Services/user-service.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../Services/localization.service';
import { NotificationService } from '../../Services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';
import { ServiceWithApiService } from '../../Services/service-with-api.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,FormsModule,CommonModule,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('badgeBounce', [
      transition(':increment', [
        style({ transform: 'scale(1.2)' }),
        animate('200ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ]),
    trigger('notificationInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {

  // userName: string | null = null;//to display the username  of the user
 userData: any;
  badgePulse = false;
 showNotifications = false;
  notifications: any[] = [];
  unreadCount = 0;
 searchValue: string = '';


  constructor(
    public authService: AuthService,
     private router: Router,
     public userService :UserServiceService ,
     public localization:LocalizationService,
      private notificationService: NotificationService,
      private toastr: ToastrService,
      public searchService:ServiceWithApiService
    ) {}
  ngOnInit(): void {
   this.userService.getUserById().subscribe((res: any) => {
    // console.log(" Current logged-in user form the career page :", res);
    this.userData = res.data; //here will be the user
    this.loadNotifications();
      this.loadUnreadCount();

    // Initialize socket and listen for new notifications
       this.notificationService.initializeSocket();
    this.notificationService.onNewNotification().subscribe(notification => {
      this.notifications.unshift(notification);
      this.unreadCount++;
      this.badgePulse = true;
      setTimeout(() => this.badgePulse = false, 300);

      // Show toast notification
      this.showNotificationToast(notification);
    });
  });
  }
  showNotificationToast(notification: any) {
    this.toastr.info(
      `<strong>${notification.title}</strong><br>${notification.message}`,
      '',
      {
        enableHtml: true,
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        toastClass: 'custom-toast',
        positionClass: 'toast-bottom-right'
      }
    );
  }

   toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.loadNotifications();
    }
  }

  loadNotifications() {
    this.notificationService.getUserNotifications().subscribe({
      next: (res: any) => {
        this.notifications = res.notifications;
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
      }
    });
  }

  loadUnreadCount() {
    this.notificationService.getUnreadCount().subscribe({
      next: (res: any) => {
        this.unreadCount = res.unreadCount;
      },
      error: (err) => {
        console.error('Error loading unread count:', err);
      }
    });
  }

  markAsRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        // Update local state
        const notification = this.notifications.find(n => n._id === notificationId);
        if (notification) {
          notification.isRead = true;
        }
        this.unreadCount = Math.max(0, this.unreadCount - 1);
      },
      error: (err) => {
        console.error('Error marking notification as read:', err);
      }
    });
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        // Update all notifications to read
        this.notifications.forEach(n => n.isRead = true);
        this.unreadCount = 0;
      },
      error: (err) => {
        console.error('Error marking all notifications as read:', err);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to landing page the default route after logout
  }
  goToHome(){
    this.router.navigate(['/home']);

  }

  changeLanguage(lang: string) {
        window.location.reload();// to relaod the website after choose the laguage for the data from the backend
   this.localization.setLanguage(lang);

  }

  //sreach
  onSearchClick() {
     console.log('Search value:', this.searchValue);
    this.searchService.changeSearchTerm(this.searchValue);
  }
}
