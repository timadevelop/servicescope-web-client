import { Component, OnInit } from '@angular/core';
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
export class NotificationsManagerComponent implements OnInit {

  paginatedNotifications: PaginatedApiResponse<Notification>;
  page: string = '1';
  pageSize: string = '20';

  constructor(
    private notificationsService: NotificationsService,
    public rns: RealtimeNotificationsService,
    public userService: UserService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.notificationsService.getNotifications(this.page, this.pageSize, null)
      .subscribe(r => {
        console.log(r);
        this.paginatedNotifications = r;
      })

  }

  logout() {
    this.authService.logout()
      .subscribe(_ => {
        // this.router.navigate(['/'])
      });
  }

  onClose() {
    this.rns.showNotificationsManager = false;
  }

  loadData(pi: number): void {
    this.notificationsService.getNotifications(String(pi), this.pageSize)
      .subscribe(r => {
        this.paginatedNotifications = r;
      })
  }
}
