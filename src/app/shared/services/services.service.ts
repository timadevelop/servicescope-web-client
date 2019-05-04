import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Service } from '../models/Service.model';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';
import { catchError, tap, mapTo } from 'rxjs/operators';
import { CustomEncoder } from './custom.encoder';
import { Vote } from '../models/Vote.model';
import { ServiceApiRequest } from '../models/api-request/service-api-request.model';

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


  private generateNewServiceFormData(service: ServiceApiRequest): FormData {
    const formData = new FormData();

    for (var key in service) {
      if (key == 'tags') {
        // tags
        for (let t of service.tags) {
          formData.append('tags', t);
        }
      }
      else if (key == 'price_details') {
        // price details json
        if (service.price_details && service.price_details.length > 0) {
          formData.append(key, JSON.stringify(service.price_details));
        }
      } else if (key == 'price') {
        // price
        formData.append(key, service[key] === null ? '0' : service[key].toString());
      } else if (key == 'images') {
        // images
        service.images.forEach((value: UploadFile, index: number, array) => {
          formData.append(`image_${index}`, value.originFileObj);
        });

      } else {
        formData.append(key, service[key]);
      }
    }

    return formData;
  }
  public create(service: ServiceApiRequest): Observable<HttpEvent<{}>> {
    const formData = this.generateNewServiceFormData(service);

    const url: string = `${environment.apiUrl}/services/`;

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      withCredentials: true,
    });

    return this.http.request(req).pipe(
      catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  public getServices(page: string, pageSize: string, query: string = null, filters: Array<{ param: string, value: string }> = []): Observable<PaginatedApiResponse<Service>> {
    let params = new HttpParams({ encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

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

      if (error.error instanceof Object) {
        for (let key in error.error) {
          this.messageService.error(`${key}: ${error.error[key]}`);
        }
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
