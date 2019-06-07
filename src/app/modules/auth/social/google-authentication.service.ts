import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService, ApiClientConfig } from 'src/app/core/services/config.service';
import { switchMap } from 'rxjs/operators';
import { TokenInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthenticationService {
  public auth2: any;
  public tokenInfo$: BehaviorSubject<TokenInfo> = new BehaviorSubject<TokenInfo>(null);
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private configService: ConfigService, private zone: NgZone, private http: HttpClient) { }

  convertToken(token: string): Observable<TokenInfo> {
    if (!token) {
      return of(null);
    }
    let req = {
      grant_type: 'convert_token',
      backend: 'google-oauth2',
      token: token,
      client_id: null,
      client_secret: null
    };
    return this.configService.currentConfig().pipe(
      switchMap((c: ApiClientConfig) => {
        req.client_id = c.API_CLIENT_ID;
        req.client_secret = c.API_CLIENT_SECRET;
        return this.http.post<TokenInfo>(`${environment.apiUrl}/auth/convert-token/`, req);
      }));
  }

  signIn(): void {
    this.auth2.signIn().then((user: gapi.auth2.GoogleUser) => {
      // TODO: access_token
      this.convertToken(user['Zi'].access_token).subscribe((tokenInfo: TokenInfo) => {
        this.zone.run(() => {
          this.tokenInfo$.next(tokenInfo);
          this.isLoggedIn$.next(true);
        });
      },
        (err) => {
          console.error(err);
        });
    });
  };

  signOut(): void {
    this.auth2.signOut().then(() => {
      this.zone.run(() => {
        this.isLoggedIn$.next(false);
        this.tokenInfo$.next(null);
      });
    },
      (err) => {
        console.error(err);
      });
  }

  loadAuth2(): void {
    this.configService.currentConfig().subscribe(c => {
      const client_id = c.GOOGLE_CLIENT_ID;
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: client_id,
          fetch_basic_profile: true
        }).then((auth) => {
          this.zone.run(() => {
            this.auth2 = auth;
            this.isLoaded$.next(true);
          });
        },
        );
      });
    });
  }
}
