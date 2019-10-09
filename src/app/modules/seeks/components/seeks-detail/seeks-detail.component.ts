import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Seek } from 'src/app/core/models/Seek.model';
import { SeeksService } from 'src/app/modules/seeks/services/seeks.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { UserService } from 'src/app/core/services/user.service';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Title } from '@angular/platform-browser';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { AdditionalConversationRouteData } from '../../../messages/redirect.guard';
import { NzMessageService } from 'ng-zorro-antd';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-seeks-detail',
  templateUrl: './seeks-detail.component.html',
  styleUrls: ['./seeks-detail.component.scss'],
  providers: [DatePipe]
})
export class SeeksDetailComponent implements OnInit, OnDestroy {
  seek: Seek;
  selectedTabsIndex: number = 0;
  private subscription: Subscription;
  showPhone: boolean = false;
  contact_phoneText: string = "Show number";

  additionalConversationRouteData: AdditionalConversationRouteData;
  array = [1, 2, 3, 4];

  static TAB_INDEXES = {
    seeks: 0,
    posts: 1,
    offers: 2,
    reviews: 3
  };

  constructor(
    public route: ActivatedRoute,
    public seeksService: SeeksService,
    public tds: TargetDeviceService,
    private router: Router,
    public userService: UserService,
    private i18n: I18n,
    private titleSeek: Title,
    private nzMessageSeek: NzMessageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SeoService) { }

  private getTabNameFromUrl(url: string) {
    return url.replace(/(\?.*|\(.*)/, '').split('/').pop();
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { seek: Seek }) => {
        if (!data.seek) {
          console.warn('Not found seek');
          // this.router.navigate(['/404'])
          return;
        }
        this.seek = data.seek;
        if (isPlatformBrowser(this.platformId)) {
          this.additionalConversationRouteData = {
            itemUrl: location.href,
            itemTitle: this.seek.title
          };
        }

        this.seo.generateTags({
          title: this.seek.title,
          description: this.seek.description,
          image: this.seek.images.length > 0 ? this.seek.images[0].image : null,
          keywords: this.seek.tags.map(t => t.name).join(',')
        });

        if (this.seek.contact_phone) {
          this.contact_phoneText = `${this.seek.contact_phone.substring(0, 4)} Show number`;
        }
        this.titleSeek.setTitle(this.seek.title);
      });

    this.updateSelectedTabIndex(this.router.url);

    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateSelectedTabIndex(event.url);
      })
  }

  private updateSelectedTabIndex(url: string) {
    const tab = this.getTabNameFromUrl(url);
    this.selectedTabsIndex = SeeksDetailComponent.TAB_INDEXES[tab];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showPhoneNumber(e) {
    if (!this.seek.contact_phone) {
      e.preventDefault();
    }
    else if (this.seek.contact_phone != this.contact_phoneText) {
      e.preventDefault();
      this.contact_phoneText = `${this.seek.contact_phone}`;
      this.showPhone = true;
    }
  }

  getSeekname(): string {
    return this.seek.title;
  }

  navigateTo(subRoute: string): void {
    this.router.navigate([`./${subRoute}`], { relativeTo: this.route });
  }

  deleteSeek(seek: Seek) {
    this.seeksService.delete(seek)
      .subscribe(
        r => {
          this.nzMessageSeek.success(this.i18n({ value: "Successfully deleted seek", id: "successOnSeekDelete" }));
          this.router.navigate(['/', 'seeks']);
        }
      );
  }
}
