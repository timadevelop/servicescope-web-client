import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    private messageService: NzMessageService
  ) { }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.messageService.error(`An error occurred: ${error.error.message}`);
    } else {
      console.log(error.error);
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // this.messageService.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${JSON.stringify(error.error)}`);

      if (error.error instanceof Object) {
        if (error.status === 401) {
          // Unauthorized
          localStorage.removeItem(environment.LOCALSTORAGE_TOKEN_INFO_KEY);
        }
        for (let key in error.error) {
          this.messageService.error(`${key}: ${error.error[key]}`);
        }
      }
    }
    // return an observable with a user-facing error message
    console.log('error', error);
    return throwError(
      'Something bad happened on error handling.');
  };

}
