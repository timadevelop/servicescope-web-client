import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { RealtimeNotificationsService } from 'src/app/core/services/socket/realtime-notifications.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public userService: UserService,
    public rns: RealtimeNotificationsService) { }

  ngOnInit() {
  }

  toggleNotificationManager() {
    if (this.userService.currentUser) {
      console.log(this.userService.currentUser.image);
      this.rns.showNotificationsManager = !this.rns.showNotificationsManager;
    }
  }

}
