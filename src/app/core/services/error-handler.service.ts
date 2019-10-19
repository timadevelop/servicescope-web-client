import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from './cookie.service';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private messageService: NzMessageService,
    private i18n: I18n
  ) { }

  public handleError(error: HttpErrorResponse) {
    if (isPlatformBrowser(this.platformId) && error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.messageService.error(`${this.i18n('An error occurred:')} ${error.error.message}`);
    } else {
      if (error.error instanceof Object) {
        if (error.status === 401) {
          // Unauthorized
          if (isPlatformBrowser(this.platformId)) {
            this.cookieService.removeItem(environment.LOCALSTORAGE_TOKEN_INFO_KEY);
          }
        }
        else if (error.status === 0) {
          this.messageService.error(this.i18n('We have some troubles. Contact Administrator please.'), { nzDuration: 5000 });
          console.warn(this.i18n('It seems like api does not work.'));
          return;
        }
        for (let key in error.error) {
          if (key === 'error' && error.error[key] === 'invalid_grant') {
            // invalid credentials
            this.messageService.error(error.error["error_description"]);
            break
          }
          this.messageService.error(`${key}: ${error.error[key]}`);
        }
      }
    }
    // return an observable with a user-facing error message
    return throwError(this.i18n('Something bad happened on error handling.'));
  };

}
