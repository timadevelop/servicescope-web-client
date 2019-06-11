import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpParams } from '@angular/common/http';
import { AuthService } from '../../modules/auth/auth.service';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment';
import { catchError, tap, share, switchMap } from 'rxjs/operators';
import { Observable, of, throwError, ReplaySubject } from 'rxjs';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';
import { CustomEncoder } from './custom.encoder';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: User;
  private currentUser$: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private authService: AuthService) {
    authService.tokenInfo$.subscribe(tokenInfo => {
      if (tokenInfo === null) {
        this.processNewUser(null);
      } else {
        console.log('reload user');
        this.reloadCurrentUser();
      }
    })
  }

  // public get currentUser(): User {
  //   return this._currentUser;
  // }

  public get currentUserObs(): Observable<User> {
    return this.currentUser$.asObservable().pipe(share());
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}/`);
  }

  public getUsers(page: string, pageSize: string): Observable<PaginatedApiResponse<User>> {
    const options =
      { params: new HttpParams({ encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize) };

    return this.http.get<PaginatedApiResponse<User>>(`${environment.apiUrl}/users/`, options);
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

  public patchCurrentUser(p: any): Observable<User> {
    if (!this.currentUser) {
      return of(null);
    }
    return this.http.patch<User>(this.currentUser.url, p)
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          throw error;
        })
      );
  }

  public updateCurrentUserAvatar(item: UploadXHRArgs): Observable<HttpEvent<{}>> {
    if (!this.currentUser) {
      item.onError!(new Error('No user for avatar uploading'), item.file!);
      return throwError(new Error('No user to upload avatar'));
    }
    const formData = new FormData();

    formData.append('image', item.file as any); // item.file type is UploadFile
    // formData.append('id', '1000');

    const uploadUrl: string = `${environment.apiUrl}/users/${this.currentUser.id}/`;

    const req = new HttpRequest('PATCH', uploadUrl, formData, {
      reportProgress: true,
      withCredentials: true
    });

    return this.http.request(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.processNewUser(event.body as User);
        }
      })
    );
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/me/`)
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return of(null);
        })
      )
  }

  public processNewUser(user: User) {
    this.currentUser = user;
    this.currentUser$.next(user);
  }

}
