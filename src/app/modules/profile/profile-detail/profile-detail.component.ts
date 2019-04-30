import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute, Router, NavigationStart, NavigationEnd, Params } from '@angular/router';
import { User } from 'src/app/shared/models/User.model';
import { UserService } from 'src/app/shared/services/user.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';
import { Service } from 'src/app/shared/models/Service.model';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  static TAB_INDEXES = {
    services: 0,
    posts: 1,
    offers: 2,
    reviews: 3
  };

  pageSize: number = 10;
  page: number = 1;

  // user
  user: User;
  selectedTabsIndex: number = 0;
  loading: boolean = false;

  private subscription: Subscription;

  // tabs
  tab: string = 'services';
  userServices: PaginatedApiResponse<Service>;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private servicesService: ServicesService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { user: User }) => {
        if (data.user) {
          this.user = data.user;
        }
      });

    this.route.queryParamMap.subscribe(qparams => {
      this.page = +qparams.get('page') || this.page;
      this.pageSize = +qparams.get('pageSize');

      this.tab = qparams.get('tab') || 'services';
      this.selectedTabsIndex = ProfileDetailComponent.TAB_INDEXES[this.tab];
      this.loadCurrentTabData();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCurrentTabData() {
    if (this.tab == 'services') {
      if (this.userServices && this.userServices.page == this.page) {
        return;
      }
      this.loading = true;
      const filters = [{ param: 'author__id', value: this.user.id.toString() }];
      this.subscription = this.servicesService.getServices(this.page.toString(), this.pageSize.toString(), null, filters)
        .subscribe(r => {
          console.log('loaded user services');
          this.userServices = r;
          this.loading = false;
        });

    }
  }

  getUsername(): string {
    return this.user.first_name + ' ' + this.user.last_name;
  }

  changeTab(tab: string): void {
    const queryParams: Params = { page: 1, tab: tab };
    this.updateQueryParams(queryParams);
  }

  private updateQueryParams(queryParams: Params) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: "merge", // remove to replace all query params by provided
      });
  }
}
