import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { RealtimeNotificationsService } from 'src/app/core/services/socket/realtime-notifications.service';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Notification } from 'src/app/core/models/Notification.model';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-manager',
  templateUrl: './notifications-manager.component.html',
  styleUrls: ['./notifications-manager.component.scss']
})
export class NotificationsManagerComponent implements OnInit, OnChanges {

  paginatedNotifications: PaginatedApiResponse<Notification>;
  page: string = '1';
  pageSize: string = '20';

  @Input() visible = false;

  constructor(
    private notificationsService: NotificationsService,
    public rns: RealtimeNotificationsService,
    public userService: UserService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && changes['visible'].currentValue) {
      this.reload();
      if (this.userService.currentUser) {
        this.userService.currentUser.notifications_count = 0;
        this.rns.clear();
      }
    }
  }

  private reload() {
    this.notificationsService.getNotifications(this.page, this.pageSize, null)
      .subscribe(r => {
        // for (const notification of r.results) {
        //      this.notiy(notification);
        // }
        this.paginatedNotifications = r;
      });
  }

  logout() {
    this.authService.logout()
      .subscribe(_ => {
        this.onClose();
        this.router.navigate(['/']);
      });
  }

  notify(notification: Notification) {
    if (!notification.notified) {
      this.rns.markNotificationAsRead(notification);
      notification.notified = true;
    }
  }

  onClose() {
    this.rns.showNotificationsManager = false;
  }

  loadData(pi: number): void {
    this.notificationsService.getNotifications(String(pi), this.pageSize)
      .subscribe(r => {
        this.paginatedNotifications = r;
      });
  }
}
