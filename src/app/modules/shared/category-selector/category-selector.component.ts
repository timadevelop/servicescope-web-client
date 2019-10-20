import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Category } from 'src/app/core/models/Category.models';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CategorySelectorComponent),
  multi: true
};

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
  providers: [customValueProvider]
})
export class CategorySelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  //
  // ControlValueAccessor
  propagateChange:any = () => {};

  writeValue(value: string): void {
    if (value) this.selectedCategoryString = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { }
  setDisabledState(isDisabled: boolean): void {}
  // /ControlValueAccessor
  //

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
    this.route.queryParamMap.subscribe(qparams => {
      this.selectedCategoryString = qparams.get('category') || this.selectedCategoryString;
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
    const queryParams: Params = { category: categoryName, page: 1, pageSize: this.pageSize, price_max: null, price_min: null };
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

  private appendCategories(response: PaginatedApiResponse<Category>) {
    if (this.categories) {
      const set = new Set([...this.categories.results, ...response.results]);
      response.results = Array.from(set.values());
    }
    this.categories = response;
  }

}
