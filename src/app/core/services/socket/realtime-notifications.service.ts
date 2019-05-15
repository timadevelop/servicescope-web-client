import { Injectable, OnDestroy } from '@angular/core';
import { ChatService, SocketMessage } from './chat.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { Notification } from '../../models/Notification.model';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class RealtimeNotificationsService implements OnDestroy {
  private sub$: Subscription;
  private notificationHistory: Array<Notification> = []

  ngOnDestroy() {
    if (this.sub$) this.sub$.unsubscribe();
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private chatService: ChatService,
    private nzNotificationService: NzNotificationService
  ) { }

  public run() {
    if (this.authService.isLoggedIn) {
      this.sub$ = this.chatService.connect().subscribe((m: SocketMessage) => {
        console.log('in ns: ', m);
        this.processMessage(m);
      });
    }
  }

  public get count() {
    return this.notificationHistory.length;
  }


  private processMessage(m: SocketMessage) {
    if (m.type == "notification") {
      const payload: Notification = m.payload as Notification;
      this.processNotification(payload);
    }
  }

  processNotification(notification: Notification) {
    console.log(notification);
    if (
      notification.recipient_id &&
      (!this.userService.currentUser ||
        this.userService.currentUser.id != notification.recipient_id)) {
      return;
    }

    this.notify(notification);
    this.notificationHistory.push(notification);
    this.markNotificationAsRead(notification);
  }

  notify(notification: Notification) {
    this.nzNotificationService.create(
      notification.type,
      notification.title,
      notification.text,
      {}
    );
  }

  private markNotificationAsRead(notification: Notification) {
    if (notification.id) {
      this.chatService.messages.next({
        type: "notification_ack",
        payload: {
          notification_id: notification.id
        }
      })
    }
  }
}
