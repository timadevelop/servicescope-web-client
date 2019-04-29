import { Injectable } from '@angular/core';
import { ServicesService } from '../../shared/services/services.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, EMPTY, throwError } from 'rxjs';
import { Service } from '../../shared/models/Service.model';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicesListResolverService implements Resolve<PaginatedApiResponse<Service>>{
  constructor(private servicesService: ServicesService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<PaginatedApiResponse<Service>> | Observable<never> {

    const page = route.queryParamMap.get('page') || '1';
    const pageSize = route.queryParamMap.get('pageSize') || '10';
    const query = route.queryParamMap.get('q');
    const tags = route.queryParamMap.getAll('tags');
    const locationId = route.queryParamMap.get('locationId');
    const priceMin = route.queryParamMap.get('price_min');
    const priceMax = route.queryParamMap.get('price_max');
    const ordering = route.queryParamMap.get('ordering');

    const category = route.paramMap.get('category');

    const filters = tags.map(tag => {
      return { param: 'tags', value: tag }
    });

    if (locationId) {
      filters.push({ param: 'location__id', value: locationId });
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
