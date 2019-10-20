import { Component, OnInit, Input } from '@angular/core';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Seek } from 'src/app/core/models/Seek.model';
import { Router, Params, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Tag } from 'src/app/core/models/Tag.models';
import { SeekPromotionsSeek } from 'src/app/modules/seeks/services/seek-promotions.service';
import { SeekPromotion } from 'src/app/core/models/SeekPromotion.model';
import { filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-promoted-seeks-list',
  templateUrl: './promoted-seeks-list.component.html',
  styleUrls: ['./promoted-seeks-list.component.scss']
})
export class PromotedSeeksListComponent implements OnInit {
  paginatedSeeks: PaginatedApiResponse<SeekPromotion>;
  pageSize: number = 5;
  page: number = 1;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private seekPromotionsSeek: SeekPromotionsSeek) {
  }

  ngOnInit() {
    var obsComb = combineLatest(this.route.paramMap, this.route.queryParamMap,
      (paramMap, queryParamMap) => ({ paramMap, queryParamMap }));

    obsComb.subscribe(ap => {
      this.loading = true;

      let paramMap = ap.paramMap;
      let queryParamMap = ap.queryParamMap;

      // const page = queryParamMap.get('page') || String(this.page);
      const page = String(this.page); // random order, vlad!
      const query = queryParamMap.get('q');
      const category = queryParamMap.get('category');
      const tags = queryParamMap.getAll('tags');
      const authorId = queryParamMap.get('authorId');
      const locationId = queryParamMap.get('locationId');

      const filters = tags.map(tag => {
        return { param: 'tags', value: tag }
      });

      if (category) {
        filters.push({ param: 'category', value: category });
      }


      if (authorId) {
        filters.push({ param: 'author_id', value: authorId });
      }

      if (locationId) {
        filters.push({ param: 'location_id', value: locationId });
      }

      return this.seekPromotionsSeek.get(String(page), String(this.pageSize), query, filters)
        .subscribe(r => {
          if (r.results.length > 3) {
            r.results.pop();
          }
          this.paginatedSeeks = r;
          this.loading = false;
        });
    });
  }

}
