import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { Business } from './business';
import { BusinessService } from './business.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessDetailResolverService implements Resolve<Business> {
  constructor(private cs: BusinessService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Business> | Observable<never> {
    let id = route.paramMap.get('id');

    return this.cs.getBusiness(+id).pipe(
      take(1),
      mergeMap(business => {
        if (business) {
          return of(business);
        } else { // id not found
          this.router.navigate(['/businesses']);
          return EMPTY;
        }
      })
    );
  }
}
