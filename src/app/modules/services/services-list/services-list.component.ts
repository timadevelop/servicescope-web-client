import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/core/models/Service.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { Title } from '@angular/platform-browser';
import { I18n } from '@ngx-translate/i18n-polyfill';

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
    private router: Router,
    private titleService: Title,
    private i18n: I18n) {
      this.titleService.setTitle(this.i18n({ value: "Services", id: "servicesListHtmlTitle" }));
    }

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
