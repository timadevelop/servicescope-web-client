import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, throwError, ReplaySubject } from 'rxjs';
import { tap, delay, mapTo, catchError, retry, map, switchMap } from 'rxjs/operators';
import { TokenInfo } from './models';
import { LoginApiRequest } from '../../core/models/api-request/login-api-request.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterApiRequest } from '../../core/models/api-request/register-api-request.model';
import { NzMessageService } from 'ng-zorro-antd';
import { LogoutApiRequest } from '../../core/models/api-request/logout-api-request.model';
import { Router } from '@angular/router';
import { ConfigService, ApiClientConfig } from 'src/app/core/services/config.service';
import { GoogleAuthenticationService } from './social/google-authentication.service';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { FacebookAuthenticationService } from './social/facebook-authentication.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'src/app/core/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _tokenInfo: TokenInfo;
  public tokenInfo$: ReplaySubject<TokenInfo> = new ReplaySubject<TokenInfo>(1);
  public redirectUrl: string;
  private _loading = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService,
    private configService: ConfigService,
    private http: HttpClient,
    private router: Router,
    public i18n: I18n,
    private errorHandlerService: ErrorHandlerService,
    private nzMessageService: NzMessageService,
    public googleAuthenticationService: GoogleAuthenticationService,
    public facebookAuthenticationService: FacebookAuthenticationService) {
    this.init();
  }

  /**
   * get loading
   */
  public get loading() {
    return this.googleAuthenticationService.loading || this.facebookAuthenticationService.loading || this._loading;
  }

  private init() {
    this.getTokenInfo();
    this.googleAuthenticationService.tokenInfo$.subscribe((tokenInfo: TokenInfo) => {
      if (tokenInfo) this.processSucceedLogin(tokenInfo);
    });
    this.facebookAuthenticationService.tokenInfo$.subscribe((tokenInfo: TokenInfo) => {
      if (tokenInfo) this.processSucceedLogin(tokenInfo);
    });
  }

  // get/set
  public get isLoggedIn(): boolean {
    return (this._tokenInfo && this._tokenInfo.access_token != null);
  }

  public get authorizationToken(): string {
    return this._tokenInfo ? `${this._tokenInfo.token_type} ${this._tokenInfo.access_token}` : null;
  }

  public restore(email: string): Observable<{ detail: string }> {
    return this.http.post<{detail: string}>(`${environment.apiUrl}/rest-auth/password/reset/`, { email });
  }
  // Auth methods
  public login(credentials: LoginApiRequest): Observable<boolean> {
    this._loading = true;
    return this.configService.currentConfig().pipe(
      switchMap((c: ApiClientConfig) => {
        credentials.client_id = c.API_CLIENT_ID;
        credentials.client_secret = c.API_CLIENT_SECRET;
        return this.http.post<TokenInfo>(`${environment.apiUrl}/auth/token/`, credentials)
          .pipe(
            tap((tokenInfo: TokenInfo) => {
              this.processSucceedLogin(tokenInfo);
              this._loading = false;
            }),
            mapTo(true),
            catchError(error => {
              this.errorHandlerService.handleError(error);
              this._loading = false;
              return throwError(error);
            })
          );
      }));
  }

  public register(credentials: RegisterApiRequest): Observable<boolean | HttpErrorResponse> {
    this._loading = true;
    return this.http.post<any>(`${environment.apiUrl}/auth/registration/`, credentials)
      .pipe(
        tap((_any: any) => {
          this._loading = false;
        }),
        mapTo(true),
        catchError(error => {
          this.errorHandlerService.handleError(error);
          this._loading = false;

          return throwError(error);
        })
      );
  }

  public logout(): Observable<boolean> {
    const logoutApiRequest: LogoutApiRequest = new LogoutApiRequest(this.authorizationToken);
    return this.configService.currentConfig().pipe(
      switchMap((c: ApiClientConfig) => {
        logoutApiRequest.client_id = c.API_CLIENT_ID;
        logoutApiRequest.client_secret = c.API_CLIENT_SECRET;
        return this.http.post<LogoutApiRequest>(`${environment.apiUrl}/auth/revoke-token/`, logoutApiRequest)
          .pipe(
            tap((_any: any) => this.clearUserInfo()),
            mapTo(true),
            catchError(error => {
              this.errorHandlerService.handleError(error);
              return throwError(error);
            })
          )
      }));
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
          this.errorHandlerService.handleError(error);
          return of(false);
        })
      );
  }

  // helpers
  public clearUserInfo(): void {
    this.removeTokenInfo();
  }

  public processSucceedLogin(tokenInfo: TokenInfo): void {
    this.storeTokenInfo(tokenInfo);
  }

  public applyRedirectUrl() {
    // Redirect the user
    if (this.redirectUrl) {
      let redirect = this.router.parseUrl(this.redirectUrl);
      this.redirectUrl = null;
      this.router.navigateByUrl(redirect);
    }
  }

  // Localstorage management

  private storeTokenInfo(tokens: TokenInfo) {
    this.cookieService.setWithExpiryInSeconds(environment.LOCALSTORAGE_TOKEN_INFO_KEY, JSON.stringify(tokens), tokens.expires_in);
    this._tokenInfo = tokens;
    this.tokenInfo$.next(tokens);
  }

  public getTokenInfo(): TokenInfo {
    const cookie = this.cookieService.get(environment.LOCALSTORAGE_TOKEN_INFO_KEY);
    if (!cookie) {
      return new TokenInfo();
    }

    const token = JSON.parse(cookie) as TokenInfo;
    if (!this._tokenInfo || !token || this._tokenInfo.access_token != token.access_token) {
      this._tokenInfo = token;
      this.tokenInfo$.next(this._tokenInfo);
    } else {
      this._tokenInfo = token;
    }
    return token;
  }

  private removeTokenInfo() {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.removeItem(environment.LOCALSTORAGE_TOKEN_INFO_KEY);
      this._tokenInfo = null;
      this.tokenInfo$.next(null);
    } else {
      console.warn("Trying to logout user during SSR.")
    }
  }
}
