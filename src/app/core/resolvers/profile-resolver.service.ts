import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { User } from '../models/User.model';
import { take, mergeMap, map, switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<User>{
  constructor(private userService: UserService, private router: Router) { }
  lastUser: User = null;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<User> | Observable<never> {

    let id = +route.paramMap.get('id');

    return this.userService.currentUserObs.pipe(
      first(),
      switchMap(user => {
        if (user && user.id == id) {
          return of(user);
        }
        else {
          return this.resolveUser(id);
        }
      }));
  }

  private resolveUser(id): Observable<User> {
    if (this.lastUser && this.lastUser.id == id) {
      return of(this.lastUser);
    }

    return this.userService.getUserById(+id).pipe(
      take(1),
      mergeMap((user: User) => {
        if (user) {
          this.lastUser = user;
          return of(user);
        } else { // id not found
          this.router.navigate(['/profiles']);
          return EMPTY;
        }
      })
    );
  }
}
