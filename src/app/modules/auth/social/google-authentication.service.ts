import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthenticationService {
  public auth2: any;
  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private zone: NgZone, private http: HttpClient) { }

  convertToken(token: string): Observable<User> {
    // curl -X POST -d
    // "grant_type=convert_token&client_id=<client_id>&client_secret=<client_secret>&backend=facebook&token=<facebook_token>"
    //  http://localhost:8000/auth/convert-token
    return this.http.post<User>(`${environment.apiUrl}/auth/convert_token/`, {
      grant_type: 'convert_token',
      backend: 'google',
      token: token
    });
  }

  signIn(): void {
    this.auth2.signIn().then((user: gapi.auth2.GoogleUser) => {
      console.log('gapi: ', user);
      this.convertToken(user.getAuthResponse().id_token).subscribe(user => {
        console.log(user);
        // this.zone.run(() => {
        //   this.user$.next(user);
        //   this.isLoggedIn$.next(true);
        // });
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
        this.user$.next(null);
      });
    },
      (err) => {
        console.error(err);
      });
  }

  loadAuth2(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: 'yourClientId',
        fetch_basic_profile: true
      }).then((auth) => {
        this.zone.run(() => {
          this.auth2 = auth;
          this.isLoaded$.next(true);
        });
      },
      );
    });
  }
}
