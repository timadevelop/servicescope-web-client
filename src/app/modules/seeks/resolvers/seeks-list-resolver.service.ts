import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, EMPTY, throwError } from 'rxjs';
import { Seek } from '../../../core/models/Seek.model';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SeeksService } from '../services/seeks.service';
import { PaginatedApiResponse } from '../../../core/models/api-response/paginated-api-response';


@Injectable({
  providedIn: 'root'
})
export class SeeksListResolverService implements Resolve<PaginatedApiResponse<Seek>>{
  constructor(private seeksService: SeeksService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<PaginatedApiResponse<Seek>> | Observable<never> {

    const page = route.queryParamMap.get('page') || '1';
    const pageSize = route.queryParamMap.get('pageSize') || '20';
    const query = route.queryParamMap.get('q');
    const tags = route.queryParamMap.getAll('tags');
    const locationId = route.queryParamMap.get('locationId');
    const priceMin = route.queryParamMap.get('price_min');
    const priceMax = route.queryParamMap.get('price_max');
    let ordering = route.queryParamMap.get('ordering');
    if (ordering == 'price' || ordering == '-price') {
      ordering = ordering.replace('price', 'max_price');
    }
    let authorId = route.queryParamMap.get('authorId');
    if ('author_id_parent_parameter' in route.data && route.data.author_id_parent_parameter) {
      // e.g. /users/:userId/projects
      authorId = route.parent.paramMap.get(route.data.author_id_parent_parameter);
    }


    const category = route.queryParamMap.get('category');

    const filters = tags.map(tag => {
      return { param: 'tags', value: tag }
    });

    if (locationId) {
      filters.push({ param: 'location_id', value: locationId });
    }

    if (category) {
      filters.push({ param: 'category', value: category });
    }

    if (priceMin) {
      filters.push({ param: 'max_price_min', value: priceMin });
    }
    if (priceMax) {
      filters.push({ param: 'max_price_max', value: priceMax });
    }

    if (ordering) {
      filters.push({ param: 'ordering', value: ordering });
    }

    if (authorId) {
      filters.push({ param: 'author_id', value: authorId });
    }


    return this.seeksService.getSeeks(page, pageSize, query, filters).pipe(
      take(1),
      mergeMap((seeks: PaginatedApiResponse<Seek>) => {

        if (seeks) {
          return of(seeks);
        } else {
          this.router.navigate(['/']);
          return EMPTY;
        }
      }),
      catchError(e => {
        if (e instanceof HttpErrorResponse) {
          if (e.status == 404) {
            return of(new PaginatedApiResponse<Seek>());
          }
        }
        return EMPTY;
      })
    );
  }
}
