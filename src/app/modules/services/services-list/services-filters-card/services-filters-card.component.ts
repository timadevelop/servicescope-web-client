import { Component, OnInit, OnDestroy } from '@angular/core';
import { TagsService } from 'src/app/shared/services/tags.service';
import { Tag } from 'src/app/shared/models/Tag.models';
import { Observable, Subscription } from 'rxjs';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';
import { mapTo, map } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Url } from 'url';
import { NzMessageService } from 'ng-zorro-antd';
import { Category } from 'src/app/shared/models/Category.models';
import { CategoriesService } from 'src/app/shared/services/categories.service';

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
    private categoriesService: CategoriesService,
    private msgService: NzMessageService) { }

  private page = '1';
  private pageSize = '20';
  private tagsSub$: Subscription;
  private categoriesSub$: Subscription;

  tags: PaginatedApiResponse<Tag>;
  selectedTagStrings: Array<string> = [];
  selectedTags: Array<Tag> = [];
  checked: boolean; // TODO
  visibleFilterDetails = false;

  categories: PaginatedApiResponse<Category>;
  selectedCategoryString: string;
  optionList: string[] = [];
  isLoadingCategories = false;



  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.selectedTagStrings = params.getAll('tags');
      if (this.tags) {
        this.updateSelectedTags();
      }

    });
    this.route.paramMap.subscribe(params => {
      this.selectedCategoryString = params.get('category');
    });

    this.tagsSub$ = this.tagsService.getTags(this.page, this.pageSize)
      .subscribe(v => this.appendTags(v));


    this.categoriesSub$ = this.categoriesService.getCategories(this.page, this.pageSize)
      .subscribe(v => this.appendCategories(v));
  }

  public trackIdentifyByItemId(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    this.tagsSub$.unsubscribe();
    this.categoriesSub$.unsubscribe();
  }

  openDetailedFilters(): void {
    this.visibleFilterDetails = true;
  }

  closeDetailedFilters(): void {
    this.visibleFilterDetails = false;
  }


  /*
  *  Categories
  */

  onSearchCategories(value: string): void {
    this.isLoadingCategories = true;
    this.searchCategories(value);
  }

  loadMoreCategories(): void {
    if (this.categories.next) {
      this.isLoadingCategories = true;
      this.categoriesSub$.unsubscribe();

      this.categoriesSub$ = this.categoriesService.getNextCategories(this.categories.next)
        .subscribe(v => {
          this.appendCategories(v);
          this.isLoadingCategories = false;
        });
    }
  }

  searchCategories(query: string): void {
    this.categoriesSub$.unsubscribe;
    this.categoriesSub$ = this.categoriesSub$ = this.categoriesService.getCategories(this.page, this.pageSize, query)
      .subscribe(v => {
        this.categories = v;
        this.isLoadingCategories = false;
      });
  }


  onCategotyChange(categoryName: string) {
    if (!categoryName) {
      this.navigateToSavingQueryParams(['../../']);
    } else if (!this.selectedCategoryString) {
      this.navigateToSavingQueryParams(['./category', categoryName]);
    } else {
      // change selected category
      this.navigateToSavingQueryParams(['../', categoryName]);
    }
  }

  private appendCategories(response: PaginatedApiResponse<Category>) {
    if (this.categories) {
      const set = new Set([...this.categories.results, ...response.results]);
      response.results = Array.from(set.values());
    }
    this.categories = response;
  }

  /*
  *  Tags
  */
  loadMoreTags(): void {
    if (this.tags.next) {
      this.tagsSub$.unsubscribe();

      this.tagsSub$ = this.tagsService.getNextTags(this.tags.next)
        .subscribe(v => this.appendTags(v));
    }
  }

  searchTags(query: string): void {
    this.tagsSub$ = this.tagsService.getTags(this.page, this.pageSize, query)
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
    this.page = '1';
    const queryParams: Params = { tags: this.selectedTagStrings, page: 1, pageSize: this.pageSize };
    this.updateQueryParams(queryParams);

  }

  /*
  * Route helper
  */
  private updateQueryParams(queryParams: Params) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: "merge", // remove to replace all query params by provided
      });
  }

  private navigateToSavingQueryParams(route: Array<string>) {
    this.router.navigate(
      route,
      {
        relativeTo: this.route,
        queryParamsHandling: "merge", // remove to replace all query params by provided
      });
  }
}
