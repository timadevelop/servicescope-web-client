import { Component, OnInit, Input } from '@angular/core';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Service } from 'src/app/core/models/Service.model';
import { Router, Params } from '@angular/router';
import { Tag } from 'src/app/core/models/Tag.models';
import { ServicePromotionsService } from 'src/app/core/services/service-promotions.service';
import { ServicePromotion } from 'src/app/core/models/ServicePromotion.model';

@Component({
  selector: 'app-promoted-services-list',
  templateUrl: './promoted-services-list.component.html',
  styleUrls: ['./promoted-services-list.component.scss']
})
export class PromotedServicesListComponent implements OnInit {
  paginatedServices: PaginatedApiResponse<ServicePromotion>;
  pageSize: number = 5;
  page: number = 1;
  loading: boolean = true;

  constructor(
    private router: Router,
    private servicePromotionsService: ServicePromotionsService) { }

  ngOnInit() {
    this.loadPromotedServices();
  }

  loadPromotedServices() {

    this.loading = true;
    const filters = [];
    // this.service.tags.map(tag => {
    //   return { param: 'tags', value: tag.name };
    // });

    const query = null;
    return this.servicePromotionsService.get(String(this.page), String(this.pageSize), query, filters)
      .subscribe(r => {
        console.log(r);
        this.paginatedServices = r;
        this.loading = false;
      });
  }

  navigateToAllPromotedServices() {
    // const selectedTagStrings = this.service.tags.map((v: Tag, i: number, arr) => v.name);

    // const queryParams: Params = { tags: selectedTagStrings };

    this.router.navigate(
      ['/services'],
      {
        // queryParams: queryParams,
      });
  }

}
