import { Component, OnInit, Input } from '@angular/core';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Service } from 'src/app/core/models/Service.model';
import { Router, Params, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Tag } from 'src/app/core/models/Tag.models';
import { ServicePromotionsService } from 'src/app/core/services/service-promotions.service';
import { ServicePromotion } from 'src/app/core/models/ServicePromotion.model';
import { filter } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private servicePromotionsService: ServicePromotionsService) {
    this.loadPromotedServices();
  }

  ngOnInit() {
    // this.route.queryParamMap.subscribe(queryParamMap => {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(event => {
        let paramMap = this.route.snapshot.paramMap;
        let queryParamMap = this.route.snapshot.queryParamMap;

        const page = queryParamMap.get('page') || String(this.page);
        const query = queryParamMap.get('q');
        const category = paramMap.get('category');
        const tags = queryParamMap.getAll('tags');

        const filters = tags.map(tag => {
          return { param: 'tags', value: tag }
        });

        if (category) {
          filters.push({ param: 'category', value: category });
        }

        return this.servicePromotionsService.get(String(page), String(this.pageSize), query, filters)
          .subscribe(r => {
            console.log(r);
            this.paginatedServices = r;
            this.loading = false;
          });
      });
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

}
