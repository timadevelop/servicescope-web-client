import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';

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
    private router: Router) { }

  ngOnInit(): void {
    // this.loadData(1);
    this.route.queryParamMap.subscribe(params => {
      this.pageSize = +params.get('pageSize') || this.pageSize;
      this.page = +params.get('page') || this.page;
    })

    this.route.data
      .subscribe((data: { users: PaginatedApiResponse<User> }) => {
        this.paginatedUsers = data.users;
      });
  }

  loadData(pi: number): void {
    this.router.navigate(['./profiles'], { queryParams: {page: pi, pageSize: this.pageSize} });
  }
}
