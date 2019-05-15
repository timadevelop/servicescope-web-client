import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from 'src/app/core/models/User.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  static DEFAULT_TAB = 'services';
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

  // tabs
  tab: string = ProfileDetailComponent.DEFAULT_TAB;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { user: User }) => {
        if (data.user) {
          this.user = data.user;
          this.updateQueryParams({ authorId: this.user.id });
        }
        // services, posts, offers, etc. are propagated to child components
      });

    this.route.queryParamMap.subscribe(qparams => {
      this.tab = qparams.get('tab') || ProfileDetailComponent.DEFAULT_TAB;
      this.selectedTabsIndex = ProfileDetailComponent.TAB_INDEXES[this.tab];
    });
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
