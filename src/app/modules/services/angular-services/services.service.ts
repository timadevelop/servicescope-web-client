import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { UploadFile } from 'ng-zorro-antd';
import { Service, ServiceImage } from '../../../core/models/Service.model';
import { Observable, throwError, of, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedApiResponse } from '../../../core/models/api-response/paginated-api-response';
import { catchError, tap } from 'rxjs/operators';
import { CustomEncoder } from '../../../core/services/custom.encoder';
import { ServiceApiRequest } from '../../../core/models/api-request/service-api-request.model';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  @Cacheable({
    maxAge: 20 * 1000
  })
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
          if (!value.url && value.originFileObj) {
            formData.append(`image_${index}`, value.originFileObj);
          }
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
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  /* Update service */
  public update(service: Service, serviceApiRequest: ServiceApiRequest): Observable<HttpEvent<{}>> {

    const newImagesToUpload = serviceApiRequest.images.filter(v => !v.url && v.originFileObj);
    const untouchedImages = serviceApiRequest.images.filter(v => v.url && !v.originFileObj);

    // delete deleted on UI images
    this.clearServiceImages(service, untouchedImages);

    serviceApiRequest.images = newImagesToUpload;

    const formData = this.generateNewServiceFormData(serviceApiRequest);

    const url: string = service.url;

    const req = new HttpRequest('PATCH', url, formData, {
      reportProgress: true,
      withCredentials: true,
    });

    // update.
    return this.http.request(req).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  /* Deletes deleted on UI images */
  private clearServiceImages(oldService: Service, untouchedImages: UploadFile[]) {
    const imagesToDelete = oldService.images.filter(image => untouchedImages.findIndex(v => v.url === image.image) === -1);
    imagesToDelete.forEach(image => {
      this.deleteServiceImage(image).subscribe(
        r => {
          // console.log('deleted:', image, r);
        }
      );
    })
  }

  public deleteServiceImage(image: ServiceImage) {
    return this.http.delete(image.url).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  @Cacheable({
    maxAge: 60 * 1000
  })
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
          this.errorHandlerService.handleError(error);
          return throwError(error);
        })
      );
  }

  public delete(service: Service) {
    return this.http.delete(service.url)
  }
}
