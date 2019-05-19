import { Component } from '@angular/core';
import { slideInAnimation } from './animations';
import { RouterOutlet, Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd';
import { RealtimeNotificationsService } from './core/services/socket/realtime-notifications.service';

import icons from './icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'saasWebClient';

  loading: boolean = false;

  constructor(
    private router: Router,
    private _iconService: NzIconService,
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


  getAnimationData(
    outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation'];
  }
}
