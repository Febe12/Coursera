import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
 private apiUrl = `${environment.backendURL}/notifications`;
  constructor(private http: HttpClient,private socket: Socket ,  private toastr: ToastrService) {}

  getUserNotifications() {
    return this.http.get(`${this.apiUrl}/`);
  }

  getUnreadCount() {
    return this.http.get(`${this.apiUrl}/unread-count`);
  }

  markAsRead(notificationId: string) {
    return this.http.patch(`${this.apiUrl}/${notificationId}/mark-read`, {});
  }

  markAllAsRead() {
    return this.http.patch(`${this.apiUrl}/mark-all-read`, {});
  }
   onNewNotification(): Observable<any> {
    return new Observable(observer => {
      this.socket.fromEvent('newNotification').subscribe((notification: any) => {
        // Show toast notification
        this.toastr.info(notification.message, notification.title, {
          disableTimeOut: notification.type === 'important',
          tapToDismiss: true,
          closeButton: true
        });

        // Pass the notification to subscribers
        observer.next(notification);
      });
    });
  }
   initializeSocket() {
    this.socket.connect();
  }
}
