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

    let page = route.queryParamMap.get('page') || '1';
    let pageSize = route.queryParamMap.get('pageSize') || '10';

    return this.servicesService.getServices(page, pageSize).pipe(
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
            return EMPTY;
          }
        }
        return throwError(e);
      })
    );
  }
}
