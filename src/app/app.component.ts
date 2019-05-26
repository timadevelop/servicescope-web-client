import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { slideInAnimation } from './animations';
import { RouterOutlet, Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NzIconService, NzEmptyService } from 'ng-zorro-antd';
import { RealtimeNotificationsService } from './core/services/socket/realtime-notifications.service';

import icons from './icons';
import { ConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements AfterViewInit {
  title = 'saasWebClient';
  @ViewChild('customEmptyTpl') customEmptyTpl: TemplateRef<any>;

  loading: boolean = false;

  constructor(
    private configService: ConfigService,
    private router: Router,
    private _iconService: NzIconService,
    private nzEmptyService: NzEmptyService,
    public rns: RealtimeNotificationsService) {
      // init loading
      this.router.events.subscribe((event: Event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            setTimeout(() => this.loading = false);
            break;
          }
          default: {
            break;
          }
        }
      });
      // register custom icons
      icons.forEach(icon => {
        this._iconService.addIconLiteral(icon.type, icon.literal);
      });
      // run notifications service
      this.rns.run();
  }

  ngAfterViewInit() {
    // set custom empty data template
    this.nzEmptyService.setDefaultContent(this.customEmptyTpl); // tslint:disable-line:no-any
  }

  getAnimationData(
    outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation'];
  }
}
