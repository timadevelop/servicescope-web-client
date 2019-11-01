import { Injectable } from '@angular/core';
import { Notification } from '../models/Notification.model';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';
import { CustomEncoder } from './custom.encoder';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  @Cacheable()
  public getNotificationById(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${environment.apiUrl}/notifications/${id}/`);
  }

  @Cacheable({
    maxAge: 10 * 1000
  })
  public getNotifications(page: string, pageSize: string, query: string = null): Observable<PaginatedApiResponse<Notification>> {
    let params = new HttpParams({ encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

    if (query) {
      params = params.set('search', query);
    }

    const options =
      { params: params };

    return this.http.get<PaginatedApiResponse<Notification>>(`${environment.apiUrl}/notifications/`, options);
  }

  @Cacheable({
    maxAge: 30 * 1000
  })
  public getNextNotifications(next: string): Observable<PaginatedApiResponse<Notification>> {
    return this.http.get<PaginatedApiResponse<Notification>>(next);
  }

}
