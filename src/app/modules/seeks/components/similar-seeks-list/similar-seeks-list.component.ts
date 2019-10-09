import { Component, OnInit, Input } from '@angular/core';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Seek } from 'src/app/core/models/Seek.model';
import { SeeksService } from 'src/app/modules/seeks/services/seeks.service';
import { Router, Params } from '@angular/router';
import { Tag } from 'src/app/core/models/Tag.models';

@Component({
  selector: 'app-similar-seeks-list',
  templateUrl: './similar-seeks-list.component.html',
  styleUrls: ['./similar-seeks-list.component.scss']
})
export class SimilarSeeksListComponent implements OnInit {
  paginatedSeeks: PaginatedApiResponse<Seek>;
  pageSize: number = 10;
  page: number = 1;
  loading: boolean = true;

  @Input() seek: Seek;

  constructor(
    private router: Router,
    private seeksService: SeeksService) { }

  ngOnInit() {
    if (this.seek) {
      this.loadSimilarSeeks();
    } else {
      console.warn("No seek parameter provided to similar-seeks-list");
    }
  }

  loadSimilarSeeks() {
    this.loading = true;
    const filters = this.seek.tags.map(tag => {
      return { param: 'tags', value: tag.name };
    });

    const query = null;
    return this.seeksService.getSeeks(this.page + '', '' + this.pageSize, query, filters)
      .subscribe(r => {
        this.paginatedSeeks = r;
        r.results = r.results.filter(s => this.seek.id != s.id);
        this.loading = false;
      });
  }

  navigateToAllSimilarSeeks() {
    const selectedTagStrings = this.seek.tags.map((v: Tag, i: number, arr) => v.name);

    const queryParams: Params = { tags: selectedTagStrings };

    this.router.navigate(
      ['/seeks'],
      {
        queryParams: queryParams,
      });
  }

}
