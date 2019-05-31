import { Component, OnInit, Input } from '@angular/core';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Service } from 'src/app/core/models/Service.model';
import { Router, Params, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Tag } from 'src/app/core/models/Tag.models';
import { ServicePromotionsService } from 'src/app/core/services/service-promotions.service';
import { ServicePromotion } from 'src/app/core/models/ServicePromotion.model';
import { filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

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
  show = false;

  constructor(
    private route: ActivatedRoute,
    private servicePromotionsService: ServicePromotionsService) {
  }

  ngOnInit() {
    var obsComb = combineLatest(this.route.paramMap, this.route.queryParamMap,
      (paramMap, queryParamMap) => ({ paramMap, queryParamMap }));

    obsComb.subscribe(ap => {
      let paramMap = ap.paramMap;
      let queryParamMap = ap.queryParamMap;

      // const page = queryParamMap.get('page') || String(this.page);
      const page = String(this.page); // random order, vlad!
      const query = queryParamMap.get('q');
      const category = paramMap.get('category');
      const tags = queryParamMap.getAll('tags');
      const authorId = queryParamMap.get('authorId');

      const filters = tags.map(tag => {
        return { param: 'tags', value: tag }
      });

      if (category) {
        filters.push({ param: 'category', value: category });
      }


      if (authorId) {
        filters.push({ param: 'author_id', value: authorId });
      }

      return this.servicePromotionsService.get(String(page), String(this.pageSize), query, filters)
        .subscribe(r => {
          this.paginatedServices = r;
          if (this.paginatedServices.count > 0) {
            this.show = true;
          } else {
            this.show = false;
          }
          this.loading = false;
        });
    });
  }

}
