import { Component, OnInit, OnDestroy } from '@angular/core';
import { TagsService } from 'src/app/shared/services/tags.service';
import { Tag } from 'src/app/shared/models/Tag.models';
import { Observable, Subscription } from 'rxjs';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';
import { mapTo, map } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Url } from 'url';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-services-filters-card',
  templateUrl: './services-filters-card.component.html',
  styleUrls: ['./services-filters-card.component.scss']
})
export class ServicesFiltersCardComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tagsService: TagsService,
    private msgService: NzMessageService) { }

  private page = '1';
  private pageSize = '20';
  private sub$: Subscription;


  tags: PaginatedApiResponse<Tag>;
  selectedTagStrings: Array<string> = [];
  selectedTags: Array<Tag> = [];
  checked: boolean; // TODO
  visibleFilterDetails = false;

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.selectedTagStrings = params.getAll('tags');
      if (this.tags) {
        this.updateSelectedTags();
      }
    });

    this.sub$ = this.tagsService.getTags(this.page, this.pageSize)
      .subscribe(v => this.appendTags(v));
  }

  public trackIdentifyTag(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  openDetailedFilters(): void {
    this.visibleFilterDetails = true;
  }

  closeDetailedFilters(): void {
    this.visibleFilterDetails = false;
  }

  loadMoreFilters(): void {
    if (this.tags.next) {
      this.sub$.unsubscribe();

      this.sub$ = this.tagsService.getNextTags(this.tags.next)
        .subscribe(v => this.appendTags(v));
    }
  }

  searchTags(query: string): void {
    this.sub$ = this.tagsService.getTags(this.page, this.pageSize, query)
      .subscribe(v => {
        this.tags = v;
      });
  }

  private appendTags(response: PaginatedApiResponse<Tag>) {
    if (this.tags) {
      const set = new Set([...this.tags.results, ...response.results]);
      response.results = Array.from(set.values());
    }
    this.tags = response;
    this.updateSelectedTags();
  }


  private updateSelectedTags() {
    this.selectedTags = this.selectedTags.filter(t => this.selectedTagStrings.includes(t.name));

    for (let tag of this.selectedTagStrings) {
      if (this.selectedTags.filter(t => t.name == tag).length > 0) {
        continue;
      }

      const inResults = this.tags.results.filter(v => v.name == tag);
      if (inResults.length > 0) {
        this.selectedTags.push(inResults.pop());
        continue;
      }
      this.tagsService.getTagByName(tag).subscribe(tag => {
        this.selectedTags = [...this.selectedTags, tag];
      });
    }
  }

  clickedTag(name: string) {

    if (!this.selectedTagStrings.includes(name)) {
      // add tag
      if (this.selectedTagStrings.length >= 5) {
        this.msgService.warning('You can select 5 tags max');
        return;
      }
      this.selectedTagStrings = [...this.selectedTagStrings, name];

    } else {
      // delete tag
      this.selectedTagStrings = this.selectedTagStrings.filter(v => v != name);
    }
    const queryParams: Params = { tags: this.selectedTagStrings };
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
