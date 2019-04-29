import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Service } from 'src/app/shared/models/Service.model';
import { ServicesService } from 'src/app/shared/services/services.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services-detail',
  templateUrl: './services-detail.component.html',
  styleUrls: ['./services-detail.component.scss']
})
export class ServicesDetailComponent implements OnInit, OnDestroy {
  service: Service;
  selectedTabsIndex: number = 0;
  private subscription: Subscription;
  showPriceDetails: boolean = false;
  showPhone: boolean = false;
  contact_phoneText: string = "Show number";

  array = [1, 2, 3, 4];

  static TAB_INDEXES = {
    services: 0,
    posts: 1,
    offers: 2,
    reviews: 3
  };

  constructor(
    public route: ActivatedRoute,
    public servicesService: ServicesService,
    private router: Router) { }

  private getTabNameFromUrl(url: string) {
    return url.replace(/(\?.*|\(.*)/, '').split('/').pop();
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { service: Service }) => {
        if (!data.service) {
          console.warn('Not found service');
          // this.router.navigate(['/404'])
          return;
        }
        this.service = data.service;
        if (this.service.contact_phone) {
          this.contact_phoneText = `${this.service.contact_phone.substring(0, 4)} Show number`;
        }
        if (this.service.price_details instanceof Array) {
          this.showPriceDetails = true;
        }
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
    this.selectedTabsIndex = ServicesDetailComponent.TAB_INDEXES[tab];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showPhoneNumber(e) {
    if (!this.service.contact_phone) {
      e.preventDefault();
    }
    else if (this.service.contact_phone != this.contact_phoneText) {
      e.preventDefault();
      this.contact_phoneText = `${this.service.contact_phone}`;
      this.showPhone = true;
    }
  }

  getServicename(): string {
    return this.service.title;
  }

  getServiceEmailLink(): string {
    return `mailto:${this.service.contact_email}`;
  }

  navigateTo(subRoute: string): void {
    this.router.navigate([`./${subRoute}`], { relativeTo: this.route });
  }
}
