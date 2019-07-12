import { Component, OnInit, Input } from '@angular/core';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { FeedPostApiRequest } from 'src/app/core/models/api-request/feedpost-api-request.model.1';
import { FeedPost } from 'src/app/core/models/FeedPost.model';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common';
import { FeedService } from '../services/feed.service';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/core/services/seo.service';
import { Title } from '@angular/platform-browser';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  // TODO: use environment constants for initial page and pagesize
  page: number = 1;
  pageSize: number = 20;
  feedPosts: PaginatedApiResponse<FeedPost>;
  pendingFeedPosts: Array<FeedPostApiRequest> = [];

  loading: boolean = true;

  profileId: number;
  editFeedPost: FeedPost;

  constructor(
    public tds: TargetDeviceService,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
    public location: Location,
    private feedService: FeedService,
    private seo: SeoService,
    private titleService: Title,
    private i18n: I18n
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.pageSize = +params.get('pageSize') || this.pageSize;
      this.page = +params.get('page') || this.page;
    });

    this.route.data
      .subscribe((data: { feed: PaginatedApiResponse<FeedPost> }) => {
        if (data.feed) {
          this.feedPosts = data.feed;
          this.loading = false;
          if (this.feedPosts.results.length === 1) {
            this.initSeoForPost(this.feedPosts[0]);
          }
        }
      });
    this.route.parent.paramMap.subscribe(params => {
      this.profileId = +params.get('id');
    });
  }

  initSeoForPost(fp: FeedPost) {
    const title = this.i18n({ value: 'Feed Post', id: "feedPostText" }) + ' ' + fp.text;
    this.titleService.setTitle(title);
    // seo
    this.seo.generateTags({
      title: title,
      description: fp.text,
      image: fp.images.length > 0 ? fp.images[0].image : null,
      keywords: fp.tags.map(t => t.name).join(',')
});
  }

  loadData(pi: number): void {
    this.loading = true;
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

  getPublicUrl(postId: number | string): string {
    return environment.PUBLIC_ORIGIN + this.location.prepareExternalUrl(`/profiles/feed/post/${postId}`);
  }

  // posting new
  onNewPostRequest(fpr: FeedPostApiRequest) {
    this.pendingFeedPosts = [...this.pendingFeedPosts, fpr];
  }

  onNewPostDelivered(fp: FeedPost) {
    this.pendingFeedPosts = this.pendingFeedPosts.filter(e => e.text != fp.text);
    if (this.editFeedPost) {
      this.feedPosts.results = this.feedPosts.results.filter(v => v.id !== fp.id);
    }
    this.appendNewFeedPost(fp);
  }

  public appendNewFeedPost(fp: FeedPost) {
    if (this.feedPosts) {
      const set = new Set([fp, ...this.feedPosts.results]);
      this.feedPosts.results = Array.from(set.values());
    } else {
      this.feedPosts = new PaginatedApiResponse<FeedPost>();
      this.feedPosts.results = [fp];
    }
  }


  deleteFeedPost(fp: FeedPost) {
    this.feedService.delete(fp)
      .subscribe(r => {
        this.feedPosts.results = this.feedPosts.results.filter(post => post.id != fp.id);
      });
  }

  edit(fp: FeedPost) {
    this.editFeedPost = fp;
  }
}
