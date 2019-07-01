import { Injectable } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, EMPTY, throwError } from 'rxjs';
import { User } from '../../../core/models/User.model';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersListResolverService implements Resolve<PaginatedApiResponse<User>>{
  constructor(private userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<PaginatedApiResponse<User>> | Observable<never> {

    let page = route.queryParamMap.get('page') || '1';
    let pageSize = route.queryParamMap.get('pageSize') || '10';

    return this.userService.getUsers(page, pageSize).pipe(
      take(1),
      mergeMap((users: PaginatedApiResponse<User>) => {
        if (users) {
          return of(users);
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
