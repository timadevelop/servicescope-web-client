import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  conversation: boolean;

  constructor(
    public userService: UserService,
    public tds: TargetDeviceService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((r: NavigationEnd) => {
      this.checkConversation(r.url);
    });
    this.checkConversation(this.router.url);
  }

  private checkConversation(url) {
    if (url && url.includes('/c/')) {
      this.conversation = true;
    } else {
      this.conversation = false;
    }
  }

}
