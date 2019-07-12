import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Title } from '@angular/platform-browser';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  paginatedUsers: PaginatedApiResponse<User>;
  pageSize: number = 10;
  page: number = 1;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private i18n: I18n,
    private seo: SeoService) {
    this.titleService.setTitle(this.i18n({ value: "Profiles", id: "profilesHtmlTitle" }));
    // seo
    this.seo.generateTags({
      title: this.i18n({ value: 'Users', id: "usersText" }),
      description: this.i18n({value: "Users list", id: 'usersListText'}),
      keywords: 'users,profiles,services,feed,posts'
    });
  }

  ngOnInit(): void {
    // this.loadData(1);
    this.route.queryParamMap.subscribe(params => {
      this.pageSize = +params.get('pageSize') || this.pageSize;
      this.page = +params.get('page') || this.page;
    });

    this.route.data
      .subscribe((data: { users: PaginatedApiResponse<User> }) => {
        this.paginatedUsers = data.users;
      });
  }

  loadData(pi: number): void {
    this.router.navigate(['./profiles'], { queryParams: { page: pi, pageSize: this.pageSize } });
  }
}
