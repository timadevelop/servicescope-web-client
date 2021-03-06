import { Injectable } from '@angular/core';
import { ServicesService } from '../angular-services/services.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, EMPTY, throwError } from 'rxjs';
import { Service } from '../../../core/models/Service.model';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicesListResolverService implements Resolve<PaginatedApiResponse<Service>>{
  constructor(private servicesService: ServicesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<PaginatedApiResponse<Service>> | Observable<never> {

    const page = route.queryParamMap.get('page') || '1';
    const pageSize = route.queryParamMap.get('pageSize') || '20';
    const query = route.queryParamMap.get('q');
    const tags = route.queryParamMap.getAll('tags');
    const locationId = route.queryParamMap.get('locationId');
    const priceMin = route.queryParamMap.get('price_min');
    const priceMax = route.queryParamMap.get('price_max');
    const ordering = route.queryParamMap.get('ordering');

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
      filters.push({ param: 'price_min', value: priceMin });
    }
    if (priceMax) {
      filters.push({ param: 'price_max', value: priceMax });
    }

    if (ordering) {
      filters.push({ param: 'ordering', value: ordering });
    }

    if (authorId) {
      filters.push({ param: 'author_id', value: authorId });
    }


    return this.servicesService.getServices(page, pageSize, query, filters).pipe(
      take(1),
      mergeMap((services: PaginatedApiResponse<Service>) => {

        if (services) {
          return of(services);
        } else {
          this.router.navigate(['/']);
          return EMPTY;
        }
      }),
      catchError(e => {
        if (e instanceof HttpErrorResponse) {
          if (e.status == 404) {
            return of(new PaginatedApiResponse<Service>());
          }
        }
        return EMPTY;
      })
    );
  }
}
