import { Component, OnInit, Input } from '@angular/core';
import { Seek } from 'src/app/core/models/Seek.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { Title } from '@angular/platform-browser';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { SeekPromotionsSeek } from 'src/app/modules/seeks/services/seek-promotions.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-seeks-list',
  templateUrl: './seeks-list.component.html',
  styleUrls: ['./seeks-list.component.scss']
})
export class SeeksListComponent implements OnInit {
  @Input() listOnly: boolean = false;
  @Input() paginatedSeeks: PaginatedApiResponse<Seek>;
  @Input() pageSize: number = 20;
  @Input() page: number = 1;

  currentUserIsAuthorOfSeeksList: boolean = false;
  _showCreateButton: boolean = true;
  showSearchBar: boolean = true;

  isFiltersDrawerVisible: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public tds: TargetDeviceService,
    private userService: UserService,
    private seekPromotionsSeek: SeekPromotionsSeek,
    private router: Router,
    private titleSeek: Title,
    private i18n: I18n,
    private seo: SeoService) {
    this.titleSeek.setTitle(this.i18n({ value: "Seeks", id: "seeksListHtmlTitle" }));
    this.seo.generateTags({
      title: this.i18n({ value: 'Seeks', id: 'seeksText' }),
      description: this.i18n({ value: 'Search seeks seo description', id: 'seeksListSeoDescription'}),
    });
  }

  sub$: Subscription;

  ngOnDestroy(): void {
    if (this.sub$) this.sub$.unsubscribe();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.pageSize = +params.get('pageSize') || this.pageSize;
      this.page = +params.get('page') || this.page;
      const authorId = +params.get('authorId');
      if (authorId && this.userService.currentUser && this.userService.currentUser.id == authorId) {
        this.currentUserIsAuthorOfSeeksList = true;
      }
    });

    this.route.data
      .subscribe((data: { seeks: PaginatedApiResponse<Seek>, showSearchBar: boolean, showCreateButton: boolean }) => {
        if (data.seeks) {
          this.paginatedSeeks = data.seeks;
          if (!this.sub$) {
            this.subscribeForPromotedSeeksList()
          }
        }
        if (data.hasOwnProperty('showCreateButton')) {
          this._showCreateButton = data.showCreateButton;
        }
        if (data.hasOwnProperty('showSearchBar')) {
          this.showSearchBar = data.showSearchBar;
        }
      });
  }

  public get showCreateButton() {
    return this._showCreateButton || this.currentUserIsAuthorOfSeeksList;
  }

  private subscribeForPromotedSeeksList() {
    if (this.sub$) this.sub$.unsubscribe();

    this.sub$ = this.seekPromotionsSeek.lastPromotionsList.subscribe(promotions => {
      if (this.paginatedSeeks && this.paginatedSeeks.results.length > 0 &&
        promotions && promotions.results && promotions.results.length > 3) {
        let seek = promotions.results[promotions.results.length - 1].seek;
        seek.is_promoted = true;

        const n = [...this.paginatedSeeks.results];
        n.splice(n.length / 2, 0, seek);
        this.paginatedSeeks.results = n;
      }
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
