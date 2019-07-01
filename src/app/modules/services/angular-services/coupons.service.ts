import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  public redeem(code: string, reason: 'promote_service' | 'promote_post', model_id: number): Observable<{promoted_til: string}> {
    return this.http.post<{promoted_til: string}>(`${environment.apiUrl}/coupons/${code}/redeem/`, { reason, model_id })
      .pipe(
        catchError(e => {
          this.errorHandlerService.handleError(e);
          return throwError(e);
        })
      );
  }


}
