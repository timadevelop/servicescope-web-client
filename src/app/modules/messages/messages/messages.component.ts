import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  conversation: boolean;

  height: number;
  constructor(
    public userService: UserService,
    public tds: TargetDeviceService,
    private router: Router,
    private titleService: Title,
    private i18n: I18n,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.titleService.setTitle(this.i18n({ value: "Messages", id: "messagesHtmlTitle" }));
    if (isPlatformBrowser(this.platformId)) {
      this.height = document ? (document.documentElement.clientHeight - 64 - 24 - 4) : 0;
    }
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
