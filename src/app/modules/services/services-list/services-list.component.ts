import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/shared/models/Service.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';
import { TargetDeviceService } from 'src/app/shared/services/target-device.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  @Input() listOnly: boolean = false;
  @Input() paginatedServices: PaginatedApiResponse<Service>;
  @Input() pageSize: number = 10;
  @Input() page: number = 1;

  isFiltersDrawerVisible: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public tds: TargetDeviceService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.pageSize = +params.get('pageSize') || this.pageSize;
      this.page = +params.get('page') || this.page;
    });

    this.route.data
      .subscribe((data: { services: PaginatedApiResponse<Service> }) => {
        if (data.services) {
          this.paginatedServices = data.services;
        }
        // this.loading = false;
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

  setIsFiltersDrawerVisible(v: boolean) {
    this.isFiltersDrawerVisible = v;
  }
}
