import { Component, OnInit, Input } from '@angular/core';
import { RealtimeNotificationsService } from 'src/app/core/services/socket/realtime-notifications.service';
import { Notification } from 'src/app/core/models/Notification.model';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';

@Component({
  selector: 'app-notifications-manager',
  templateUrl: './notifications-manager.component.html',
  styleUrls: ['./notifications-manager.component.scss']
})
export class NotificationsManagerComponent implements OnInit {

  @Input() visible = false;

  constructor(
    public rns: RealtimeNotificationsService,
    public tds: TargetDeviceService,
    public userService: UserService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
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

}
