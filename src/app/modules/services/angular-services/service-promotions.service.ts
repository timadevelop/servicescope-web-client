import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { ServicePromotion } from '../../../core/models/ServicePromotion.model';
import { Observable, throwError, of, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedApiResponse } from '../../../core/models/api-response/paginated-api-response';
import { CustomEncoder } from '../../../core/services/custom.encoder';
import { catchError, tap, share } from 'rxjs/operators';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class ServicePromotionsService {
  lastPromotionsList: BehaviorSubject<PaginatedApiResponse<ServicePromotion>> = new BehaviorSubject(null);
  //  = <Subject<PaginatedApiResponse<ServicePromotion>>>new Subject().pipe(share());

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  public getByUrl(url: string): Observable<ServicePromotion> {
    return this.http.get<ServicePromotion>(`${url}`);
  }

  public getById(id: number): Observable<ServicePromotion> {
    return this.http.get<ServicePromotion>(`${environment.apiUrl}/service-promotions/${id}/`);
  }


  public create(promotion: ServicePromotion): Observable<ServicePromotion> {
    return this.http.post<ServicePromotion>(`${environment.apiUrl}/service-promotions/`, promotion);
  }

  @Cacheable({
    maxAge: 5 * 1000
  })
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
        tap(r => this.lastPromotionsList.next(r)),
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return throwError(error);
        })
      );
  }

}
