import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpParams } from '@angular/common/http';

import { NzMessageService } from 'ng-zorro-antd';
import { Service } from '../models/Service.model';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';
import { catchError } from 'rxjs/operators';
import { CustomEncoder } from './custom.encoder';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService) {
  }

  public getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${environment.apiUrl}/services/${id}/`);
  }

  public getServices(page: string, pageSize: string, query: string = null, filters: Array<{ param: string, value: string }> = []): Observable<PaginatedApiResponse<Service>> {
    let params = new HttpParams({encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

    if (query) {
      params = params.set('search', query);
    }

    for (let item of filters) {
      params = params.append(item.param, item.value);
    }

    const options =
      { params: params };

    return this.http.get<PaginatedApiResponse<Service>>(`${environment.apiUrl}/services/`, options)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      );
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.messageService.error(`An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // this.messageService.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${JSON.stringify(error.error)}`);

      if(error.error instanceof Object) {
        for(let key in error.error) {
          this.messageService.error(`${key}: ${error.error[key]}`);
        }
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
