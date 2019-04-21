import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpParams } from '@angular/common/http';

import { NzMessageService } from 'ng-zorro-antd';
import { Service } from '../models/Service.model';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';

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

  public getServices(page: string, pageSize: string): Observable<PaginatedApiResponse<Service>> {
    const options =
      { params: new HttpParams().set('page', page).set('page_size', pageSize) };

    return this.http.get<PaginatedApiResponse<Service>>(`${environment.apiUrl}/services/`, options);
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

}
