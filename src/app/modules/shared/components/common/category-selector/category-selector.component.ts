import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Category } from 'src/app/core/models/Category.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss']
})
export class CategorySelectorComponent implements OnInit, OnDestroy {
  categories: PaginatedApiResponse<Category>;
  @Input() selectedCategoryString: string;
  optionList: string[] = [];
  isLoadingCategories = false;
  private categoriesSub$: Subscription;

  page = '1';
  pageSize = '10';


  @Input() isFormItem: boolean = false;
  @Output() onChange = new EventEmitter<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedCategoryString = params.get('category') || this.selectedCategoryString;
    });

    this.categoriesSub$ = this.categoriesService.getCategories(this.page, this.pageSize)
      .subscribe(v => this.appendCategories(v));
  }

  ngOnDestroy() {
    this.categoriesSub$.unsubscribe();
  }


  /*
  *  Categories
  */
  public trackIdentifyByItemId(index, item) {
    return item.id;
  }

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


  onCategoryChange(categoryName: string) {
    if (this.isFormItem) {
      this.onChange.emit(categoryName);
    } else if (!categoryName) {
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

  private navigateToSavingQueryParams(route: Array<string>) {
    this.router.navigate(
      route,
      {
        relativeTo: this.route,
        queryParamsHandling: "merge", // remove to replace all query params by provided
      });
  }
}
