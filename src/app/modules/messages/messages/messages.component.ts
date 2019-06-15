import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  conversation: boolean;

  height: number = document.documentElement.clientHeight - 64 - 24 - 4;

  constructor(
    public userService: UserService,
    public tds: TargetDeviceService,
    private router: Router,
    private titleService: Title,
    private i18n: I18n
  ) {
    this.titleService.setTitle(this.i18n({ value: "Messages", id: "messagesHtmlTitle" }));
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
