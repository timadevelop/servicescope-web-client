import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanLoad, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User.model';
import { filter, map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService, private router: Router,
    private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> {
    if (!this.authService.isLoggedIn) {
      // store the attempted url for redirecting
      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);
      return of(false);
    }

    if (this.userService.currentUser) {
      return of(this.checkEmailVerification(url, this.userService.currentUser));
    } else {
      return this.userService.currentUserObs.pipe(
        first(),
        map((user: User) => {
          return this.checkEmailVerification(url, user);
        }));
    }

  }

  checkEmailVerification(url, user: User): boolean {
    if (!user || !user.is_verified_email) {
      // store the attempted url for redirecting
      this.authService.redirectUrl = url;
      this.router.navigate(['/verify-email']);
      return false;
    }
    return true
  }
}
