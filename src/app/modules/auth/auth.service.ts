import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay, mapTo, catchError, retry } from 'rxjs/operators';
import { TokenInfo } from './models';
import { User } from '../../shared/models/User.model';
import { LoginApiRequest } from '../../shared/models/api-request/login-api-request.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterApiRequest } from '../../shared/models/api-request/register-api-request.model';
import { NzMessageService } from 'ng-zorro-antd';
import { LogoutApiRequest } from '../../shared/models/api-request/logout-api-request.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOCALSTORAGE_TOKEN_INFO_KEY: string = 'TOKEN_INFO';
  private _tokenInfo: TokenInfo;
  public redirectUrl: string;

  constructor(private http: HttpClient,
    private messageService: NzMessageService,
    private router: Router) {
    this.init();
  }

  private init() {
    this._tokenInfo = this.getTokenInfo();
  }

  // get/set
  public get isLoggedIn(): boolean {
    return (this._tokenInfo && this._tokenInfo.access_token != null);
  }

  public get authorizationToken(): string {
    return this._tokenInfo ? `${this._tokenInfo.token_type} ${this._tokenInfo.access_token}` : null;
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

  // Auth methods
  public login(credentials: LoginApiRequest): Observable<boolean> {
    return this.http.post<TokenInfo>(`${environment.apiUrl}/auth/token/`, credentials)
      .pipe(
        tap((tokenInfo: TokenInfo) => this.processSucceedLogin(tokenInfo)),
        mapTo(true),
        catchError(error => {
          this.handleError(error);
          return of(false);
        })
      );
  }

  public register(credentials: RegisterApiRequest): Observable<boolean | HttpErrorResponse> {
    return this.http.post<any>(`${environment.apiUrl}/auth/registration/`, credentials)
      .pipe(
        tap((_any: any) => true),
        mapTo(true),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      );
  }

  public logout(): Observable<boolean> {
    const logoutApiRequest: LogoutApiRequest = new LogoutApiRequest(this.authorizationToken);

    return this.http.post<LogoutApiRequest>(`${environment.apiUrl}/auth/revoke-token/`, logoutApiRequest)
      .pipe(
        tap((_any: any) => this.clearUserInfo()),
        mapTo(true),
        catchError(error => {
          this.handleError(error);
          return of(false);
        })
      );
  }

  // TODO
  public refreshToken(): Observable<boolean> {

    const tokenInfo = this.getTokenInfo();
    if (!tokenInfo || !tokenInfo.refresh_token) {
      return of(false);
    }

    return this.http.post<TokenInfo>(`${environment.apiUrl}/auth/refresh-token/`, tokenInfo.refresh_token)
      .pipe(
        tap((tokenInfo: TokenInfo) => this.processSucceedLogin(tokenInfo)),
        mapTo(true),
        catchError(error => {
          this.handleError(error);
          return of(false);
        })
      );
  }

  // helpers
  private clearUserInfo(): void {
    this.removeTokenInfo();
    this._tokenInfo = null;
  }

  private processSucceedLogin(tokenInfo: TokenInfo): void {
    this.storeTokenInfo(tokenInfo);
    this._tokenInfo = tokenInfo;

    // Redirect the user
    let redirect = this.redirectUrl ? this.router.parseUrl(this.redirectUrl) : '/';
    this.redirectUrl = null;
    this.router.navigateByUrl(redirect);
  }

  // Localstorage management

  private storeTokenInfo(tokens: TokenInfo) {
    localStorage.setItem(this.LOCALSTORAGE_TOKEN_INFO_KEY, JSON.stringify(tokens));
  }

  public getTokenInfo(): TokenInfo {
    return JSON.parse(localStorage.getItem(this.LOCALSTORAGE_TOKEN_INFO_KEY)) as TokenInfo;
  }

  private removeTokenInfo() {
    localStorage.removeItem(this.LOCALSTORAGE_TOKEN_INFO_KEY);
  }
}
