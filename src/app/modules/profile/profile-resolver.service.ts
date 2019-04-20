import { Injectable } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { User } from '../../shared/models/User.model';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<User>{
  constructor(private userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<User> | Observable<never> {

    let id = route.paramMap.get('id');

    return this.userService.getUserById(+id).pipe(
      take(1),
      mergeMap((user: User) => {
        if (user) {
          return of(user);
        } else { // id not found
          this.router.navigate(['/profiles']);
          return EMPTY;
        }
      })
    );
  }
}
