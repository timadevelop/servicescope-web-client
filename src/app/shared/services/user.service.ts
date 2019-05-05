import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpParams } from '@angular/common/http';
import { AuthService } from '../../modules/auth/auth.service';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';
import { CustomEncoder } from './custom.encoder';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser: User;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private authService: AuthService) {
    if (authService.isLoggedIn) {
      this.reloadCurrentUser();
    }
  }

  public get currentUser(): User {
    return this._currentUser;
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

  private getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/me/`)
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return of(null);
        })
      )
  }

  private processNewUser(user: User) {
    this._currentUser = user;
  }

}
