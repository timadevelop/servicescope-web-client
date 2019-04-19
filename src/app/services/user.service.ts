import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser: User;

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService,
    private authService: AuthService) {
    if (authService.isLoggedIn) {
      this.reloadCurrentUser();
    }
  }

  public get currentUser(): User {
    return this._currentUser;
  }

  public reloadCurrentUser(): void {
    if (!this.authService.isLoggedIn) {
      console.warn('Trying to get current user while client is not logged in.');
      return;
    }

    this.getCurrentUser()
      .subscribe(user => {
        if (user) {
          this.processNewUser(user as User);
        }
      });
  }

  private getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/me/`)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(null);
        })
      )
  }

  private processNewUser(user: User) {
    this._currentUser = user;
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.messageService.error(`An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.messageService.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
