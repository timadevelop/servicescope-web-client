import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { ServicePromotion } from '../models/ServicePromotion.model';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';
import { CustomEncoder } from './custom.encoder';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicePromotionsService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  public getById(id: number): Observable<ServicePromotion> {
    return this.http.get<ServicePromotion>(`${environment.apiUrl}/service-promotions/${id}/`);
  }


  public create(promotion: ServicePromotion): Observable<ServicePromotion> {
    return this.http.post<ServicePromotion>(`${environment.apiUrl}/service-promotions/`, promotion);
  }

  public get(page: string, pageSize: string, query: string = null, filters: Array<{ param: string, value: string }> = []): Observable<PaginatedApiResponse<ServicePromotion>> {
    let params = new HttpParams({ encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

    if (query) {
      params = params.set('search', query);
    }

    for (let item of filters) {
      params = params.append(item.param, item.value);
    }

    const options =
      { params: params };

    return this.http.get<PaginatedApiResponse<ServicePromotion>>(`${environment.apiUrl}/service-promotions/`, options)
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return throwError(error);
        })
      );
  }

}
