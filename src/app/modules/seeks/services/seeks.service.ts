import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { UploadFile } from 'ng-zorro-antd';
import { Seek, SeekImage } from '../../../core/models/Seek.model';
import { Observable, throwError, of, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedApiResponse } from '../../../core/models/api-response/paginated-api-response';
import { catchError, tap } from 'rxjs/operators';
import { CustomEncoder } from '../../../core/services/custom.encoder';
import { SeekApiRequest } from '../../../core/models/api-request/seek-api-request.model';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SeeksService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  public getSeekById(id: number): Observable<Seek> {
    return this.http.get<Seek>(`${environment.apiUrl}/seekings/${id}/`);
  }


  private generateNewSeekFormData(seek: SeekApiRequest): FormData {
    const formData = new FormData();

    for (var key in seek) {
      if (key == 'tags') {
        // tags
        for (let t of seek.tags) {
          formData.append('tags', t);
        }
      } else if (key == 'max_price') {
        // max price
        formData.append(key, seek[key] === null ? '0' : seek[key].toString());
      } else if (key == 'images') {
        // images
        seek.images.forEach((value: UploadFile, index: number, array) => {
          if (!value.url && value.originFileObj) {
            formData.append(`image_${index}`, value.originFileObj);
          }
        });

      } else {
        formData.append(key, seek[key]);
      }
    }

    return formData;
  }

  public create(seek: SeekApiRequest): Observable<HttpEvent<{}>> {
    const formData = this.generateNewSeekFormData(seek);

    const url: string = `${environment.apiUrl}/seekings/`;

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

  /* Update seek */
  public update(seek: Seek, seekApiRequest: SeekApiRequest): Observable<HttpEvent<{}>> {

    const newImagesToUpload = seekApiRequest.images.filter(v => !v.url && v.originFileObj);
    const untouchedImages = seekApiRequest.images.filter(v => v.url && !v.originFileObj);

    // delete deleted on UI images
    this.clearSeekImages(seek, untouchedImages);

    seekApiRequest.images = newImagesToUpload;

    const formData = this.generateNewSeekFormData(seekApiRequest);

    const url: string = seek.url;

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
  private clearSeekImages(oldSeek: Seek, untouchedImages: UploadFile[]) {
    const imagesToDelete = oldSeek.images.filter(image => untouchedImages.findIndex(v => v.url === image.image) === -1);
    imagesToDelete.forEach(image => {
      this.deleteSeekImage(image).subscribe(
        r => {
          // console.log('deleted:', image, r);
        }
      );
    })
  }

  public deleteSeekImage(image: SeekImage) {
    return this.http.delete(image.url).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  public getSeeks(page: string, pageSize: string, query: string = null, filters: Array<{ param: string, value: string }> = []): Observable<PaginatedApiResponse<Seek>> {
    let params = new HttpParams({ encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

    if (query) {
      params = params.set('search', query);
    }

    for (let item of filters) {
      params = params.append(item.param, item.value);
    }

    const options =
      { params: params };

    return this.http.get<PaginatedApiResponse<Seek>>(`${environment.apiUrl}/seekings/`, options)
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return throwError(error);
        })
      );
  }

  public delete(seek: Seek) {
    return this.http.delete(seek.url)
  }
}
