import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
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
    public rns: RealtimeNotificationsService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .subscribe(_ =>
        this.router.navigate(['/']));
  }

}
