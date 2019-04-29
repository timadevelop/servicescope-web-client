import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/shared/models/Service.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  paginatedServices: PaginatedApiResponse<Service>;
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
    });

    this.route.data
      .subscribe((data: { services: PaginatedApiResponse<Service> }) => {
        this.paginatedServices = data.services;
      });
  }

  loadData(pi: number): void {
    const queryParams: Params = { page: pi, pageSize: this.pageSize };
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
