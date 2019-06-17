import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';

import { UploadFile } from 'ng-zorro-antd';

import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FeedPost } from 'src/app/core/models/FeedPost.model';
import { FeedPostApiRequest } from 'src/app/core/models/api-request/feedpost-api-request.model.1';
import { CustomEncoder } from 'src/app/core/services/custom.encoder';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';


@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  public getFeedPostById(id: number): Observable<FeedPost> {
    return this.http.get<FeedPost>(`${environment.apiUrl}/feed/${id}/`);
  }


  private generateNewFeedPostFormData(FeedPost: FeedPostApiRequest): FormData {
    const formData = new FormData();

    for (var key in FeedPost) {
      if (key == 'tags') {
        // tags
        for (let t of FeedPost.tags) {
          formData.append('tags', t);
        }
      } else if (key == 'images') {
        // images
        FeedPost.images.forEach((value: UploadFile, index: number, array) => {
          formData.append(`image_${index}`, value.originFileObj);
        });

      } else {
        formData.append(key, FeedPost[key]);
      }
    }

    return formData;
  }

  public create(FeedPost: FeedPostApiRequest): Observable<HttpEvent<{}>> {
    const formData = this.generateNewFeedPostFormData(FeedPost);

    const url: string = `${environment.apiUrl}/feed/`;

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

  public getFeedPosts(page: string, pageSize: string, query: string = null, filters: Array<{ param: string, value: string }> = []): Observable<PaginatedApiResponse<FeedPost>> {
    let params = new HttpParams({ encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

    if (query) {
      params = params.set('search', query);
    }

    for (let item of filters) {
      params = params.append(item.param, item.value);
    }

    const options =
      { params: params };

    return this.http.get<PaginatedApiResponse<FeedPost>>(`${environment.apiUrl}/feed/`, options)
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return throwError(error);
        })
      );
  }

}
