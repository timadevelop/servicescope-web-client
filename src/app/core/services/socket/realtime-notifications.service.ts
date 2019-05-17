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
  _count = 0;
  public showNotificationsManager = false;

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
        this.processMessage(m);
      });
    }
  }

  public clear() {
    this._count = 0;
  }

  public get count() {
    return this._count;
  }


  private processMessage(m: SocketMessage) {
    if (m.type == "notification") {
      const payload: Notification = m.payload as Notification;
      this.processNotification(payload);
    }
  }

  processNotification(notification: Notification) {
    if (
      notification.recipient_id &&
      (!this.userService.currentUser ||
        this.userService.currentUser.id != notification.recipient_id)) {
      return;
    }

    this.notify(notification);
    // this.markNotificationAsRead(notification);
  }

  notify(notification: Notification) {
    // console.log(this.chatService.room, notification);

    if (notification.conversation_id !== null && this.chatService.room && notification.conversation_id === +this.chatService.room) {
      return;
    }

    this.nzNotificationService.create(
      notification.type,
      notification.title,
      notification.text,
      {}
    );
    this._count += 1;
  }

  public markNotificationAsRead(notification: Notification) {
    if (notification.id) {
      this.chatService.messages.next({
        type: "notification_ack",
        payload: {
          notification_id: notification.id
        }
      });
    }
  }
}
