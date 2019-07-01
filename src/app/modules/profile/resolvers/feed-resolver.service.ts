import { Injectable } from '@angular/core';
import { FeedService } from 'src/app/modules/profile/services/feed.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FeedPost } from '../../../core/models/FeedPost.model';
import { PaginatedApiResponse } from '../../../core/models/api-response/paginated-api-response';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedResolverService implements Resolve<PaginatedApiResponse<FeedPost>> {
  constructor(private feedService: FeedService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<PaginatedApiResponse<FeedPost>> | Observable<never> {

    const feedId = +route.paramMap.get('feedId');
    if (feedId) {
      console.log('feedId', feedId);
      return this.feedService.getFeedPostById(feedId)
        .pipe(
          take(1),
          mergeMap((feedpost: FeedPost) => {
            const feed = new PaginatedApiResponse<FeedPost>();
            feed.results = [feedpost];
            feed.count = 1;
            return of(feed);
          }),
          catchError(e => {
            console.log(e);
            return EMPTY;
          })
        )
    }

    const page = route.queryParamMap.get('page') || '1';
    const pageSize = route.queryParamMap.get('pageSize') || '20';
    const query = route.queryParamMap.get('q');
    const tags = route.queryParamMap.getAll('tags');
    const ordering = route.queryParamMap.get('ordering');
    const authorId = route.queryParamMap.get('authorId') || route.paramMap.get('id');

    const filters = tags.map(tag => {
      return { param: 'tags', value: tag }
    });

    if (ordering) {
      filters.push({ param: 'ordering', value: ordering });
    }

    if (authorId) {
      filters.push({ param: 'author_id', value: authorId });
    }


    return this.feedService.getFeedPosts(page, pageSize, query, filters).pipe(
      take(1),
      mergeMap((feedposts: PaginatedApiResponse<FeedPost>) => {

        if (feedposts) {
          return of(feedposts);
        } else {
          // this.router.navigate(['/']);
          return EMPTY;
        }
      }),
      catchError(e => {
        if (e instanceof HttpErrorResponse) {
          if (e.status == 404) {
            return of(new PaginatedApiResponse<FeedPost>());
          }
        }
        return EMPTY;
      })
    );
  }
}
