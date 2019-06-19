import { Injectable, OnDestroy } from '@angular/core';
import { ChatService, SocketMessage } from './chat.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Subscription, Subject } from 'rxjs';
import { Notification } from '../../models/Notification.model';
import { UserService } from '../user.service';
import { NotificationsService } from '../notifications.service';

@Injectable({
  providedIn: 'root'
})
export class RealtimeNotificationsService implements OnDestroy {
  private sub$: Subscription;
  public notificationHistory: Array<Notification> = [];
  public showNotificationsManager = false;
  public page: string = '1';
  public pageSize: string = '20';

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private userService: UserService,
    private chatService: ChatService,
    private nzNotificationService: NzNotificationService
  ) { }


  ngOnDestroy() {
    if (this.sub$) this.sub$.unsubscribe();
  }

  public run() {
    if (this.authService.isLoggedIn) {
      this.getNotifications();
      this.chatService.onNewSubject.subscribe((sm: Subject<SocketMessage>) => {
        if (!sm) {
          // console.log('waiting in rns...');
          return;
        }
        // console.log('reconnect on rns')
        if (this.sub$) this.sub$.unsubscribe();
        this.sub$ = sm.subscribe((m: SocketMessage) => {
          this.processMessage(m);
        });
      });
    }
  }


  private getNotifications() {
    this.page = '1';
    this.notificationsService.getNotifications(this.page, this.pageSize, null)
      .subscribe(r => {
        this.notificationHistory = r.results;
      });
  }

  loadData(pi: number): void {
    this.page = String(pi);
    this.notificationsService.getNotifications(String(pi), this.pageSize)
      .subscribe(r => {
        // update, yep, delete old info
        this.notificationHistory = r.results;
      });
  }

  public clear() {
    this.notificationHistory = [];
  }

  public get count() {
    return this.notificationHistory.filter(v => !v.notified).length;
  }


  private processMessage(m: SocketMessage) {
    if (m.type == "notification") {
      const payload: Notification = m.payload as Notification;
      this.processNotification(payload);
    }
    else if (m.type == 'joined_room') {
      const room: number = +m.payload["room_name"];

      this.filterNotificationHistory((n: Notification) => n.conversation_id != room);
    }
  }

  processNotification(notification: Notification) {
    if (notification.conversation_id) {
      this.chatService.setConversationLastMessage(notification.conversation_id, notification.text);
    }
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

    if (notification.conversation_id !== null) {
      if (this.chatService.room && notification.conversation_id === +this.chatService.room) {
        this.markNotificationAsRead(notification);
        return;
      }
    }

    this.nzNotificationService.create(
      notification.type,
      notification.title,
      notification.text,
      {}
    );
    this.notificationHistory = [...this.notificationHistory, notification];
  }

  private filterNotificationHistory(filter: (Notification) => boolean) {
    this.notificationHistory = this.notificationHistory.filter(v => filter(v));
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
