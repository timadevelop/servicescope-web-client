import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from 'src/app/core/models/User.model';
import { UserService } from 'src/app/core/services/user.service';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Title } from '@angular/platform-browser';
import { LabeledTextComponent } from '../../shared/components/common/labeled-text/labeled-text.component';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  // static DEFAULT_TAB = 'feed';
  static TAB_INDEXES = {
    feed: 0,
    services: 1,
    posts: 2,
    offers: 3,
    reviews: 4
  };

  pageSize: number = 10;
  page: number = 1;

  // user
  user: User;
  selectedTabsIndex: number = 0;

  // tabs
  // tab: string = ProfileDetailComponent.DEFAULT_TAB;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private i18n: I18n,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.i18n({ value: "User Profile", id: "profileDetailHtmlTitle" }));
    // this.route.params.subscribe(params => {
    //   this.tab = params.get('tab');
    // })
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { user: User }) => {
        if (data.user) {
          this.user = data.user;
          this.updateQueryParams({ authorId: this.user.id });
        }
        this.titleService.setTitle(this.user.first_name + ' ' + this.user.last_name + ' ' + this.i18n({ value: "Profile", id: "profileHtmlTitle" }));
        // services, posts, offers, etc. are propagated to child components
      });

    this.route.url.subscribe(u => {
      const data = this.route.snapshot.firstChild.data;
      if ('feed' in data) {
        this.selectedTabsIndex = ProfileDetailComponent.TAB_INDEXES['feed'];
      } else if ('services' in data) {
        this.selectedTabsIndex = ProfileDetailComponent.TAB_INDEXES['services'];
      }
    })

    // this.route.queryParamMap.subscribe(qparams => {
    //   this.tab = qparams.get('tab') || ProfileDetailComponent.DEFAULT_TAB;
    //   this.selectedTabsIndex = ProfileDetailComponent.TAB_INDEXES[this.tab];
    // });
  }

  getUsername(): string {
    if (!this.user.first_name && !this.user.last_name) {
      return 'Noname'
    }
    return this.user.first_name + ' ' + this.user.last_name;
  }

  changeTab(tab: string): void {
    // const queryParams: Params = { page: 1, tab: tab };
    // this.updateQueryParams(queryParams);
    this.router.navigate([tab], { relativeTo: this.route, queryParams: { authorId: this.user.id } })
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

  onUserChange(labeledText: LabeledTextComponent, t: any): void {
    if (this.userService.currentUser && this.user.id === this.userService.currentUser.id) {
      labeledText.setLoading(true);
      this.userService.patchCurrentUser(t)
        .subscribe(
          user => {
            this.userService.processNewUser(user);
            this.user = user;
            labeledText.setEdit(false);
            labeledText.setLoading(false);
          },
          error => {
            labeledText.setLoading(false);
          });
    }
  }
}
