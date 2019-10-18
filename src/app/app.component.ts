import { Component, TemplateRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID, LOCALE_ID } from '@angular/core';
import { slideInAnimation } from './animations';
import { RouterOutlet, Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NzIconService, NzEmptyService } from 'ng-zorro-antd';
import { RealtimeNotificationsService } from './core/services/socket/realtime-notifications.service';

import { customIcons, serverPlatformIcons } from './icons';
import { TargetDeviceService } from './core/services/target-device.service';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

import { NzI18nService, bg_BG } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements AfterViewInit {
  title = 'saasWebClient';
  @ViewChild('customEmptyTpl', { static: false }) customEmptyTpl: TemplateRef<any>;

  loading: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private _iconService: NzIconService,
    private nzEmptyService: NzEmptyService,
    private nzI18n: NzI18nService,
    public rns: RealtimeNotificationsService,
    public tds: TargetDeviceService,
    @Inject(LOCALE_ID) locale: string) {
    // init loading
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event: Event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            if (!this.loading) this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            if (this.loading) setTimeout(() => this.loading = false);
            break;
          }
          default: {
            break;
          }
        }
      });

      if (locale === 'bg') {
        // en_US is by default
        this.nzI18n.setLocale(bg_BG);
      }
    }
    // register custom icons
    customIcons.forEach(icon => {
      this._iconService.addIconLiteral(icon.type, icon.literal);
    });

    // register ng icons on ssr
    if (isPlatformServer(this.platformId)) {
      serverPlatformIcons.forEach(icon => {
        this._iconService.addIcon(icon);
      });
      this.loading = true;
    }
    // run notifications service
    this.rns.run();
  }

  ngAfterViewInit() {
    // set custom empty data template
    // TODO: deprecated: 'setDefaultContent' is deprecated and would be removed in 9.0.0. Please migrate to 'NzConfigService'. Error
    // this.nzEmptyService.setDefaultContent(this.customEmptyTpl); // tslint:disable-line:no-any
  }

  getAnimationData(
    outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation'];
  }
}
