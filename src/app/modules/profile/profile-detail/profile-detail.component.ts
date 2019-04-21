import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { User } from 'src/app/shared/models/User.model';
import { UserService } from 'src/app/shared/services/user.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  user: User;
  selectedTabsIndex: number = 0;
  private subscription: Subscription;
  showPhone: boolean = false;
  phoneText: string = "Show number";

  static TAB_INDEXES = {
    services: 0,
    posts: 1,
    offers: 2,
    reviews: 3
  };

  constructor(
    public route: ActivatedRoute,
    public userService: UserService,
    private router: Router) { }

  private getTabNameFromUrl(url: string) {
    return url.replace(/(\?.*|\(.*)/, '').split('/').pop();
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { user: User }) => {
        this.user = data.user;
        if (this.user.phone) {
          this.phoneText = `${this.user.phone.substring(0, 4)} Show number`;
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
    this.selectedTabsIndex = ProfileDetailComponent.TAB_INDEXES[tab];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showPhoneNumber(e) {
    if (!this.user.phone) {
      e.preventDefault();
    }
    else if (this.user.phone != this.phoneText) {
      e.preventDefault();
      this.phoneText = `${this.user.phone}`;
      this.showPhone = true;
    }
  }

  getUsername(): string {
    return this.user.first_name + ' ' + this.user.last_name;
  }

  getUserEmailLink(): string {
    return `mailto:${this.user.email}`;
  }

  navigateTo(subRoute: string): void {
    this.router.navigate([`./${subRoute}`], { relativeTo: this.route });
  }
}
