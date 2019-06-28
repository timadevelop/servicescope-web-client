import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { UploadFile } from 'ng-zorro-antd';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FeedPost, FeedPostImage } from 'src/app/core/models/FeedPost.model';
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
          if (!value.url && value.originFileObj) {
            formData.append(`image_${index}`, value.originFileObj);
          }
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

  /* Update feedpost */
  public update(feedpost: FeedPost, feedpostApiRequest: FeedPostApiRequest): Observable<HttpEvent<{}>> {

    const newImagesToUpload = feedpostApiRequest.images.filter(v => !v.url && v.originFileObj);
    const untouchedImages = feedpostApiRequest.images.filter(v => v.url && !v.originFileObj);

    // delete deleted on UI images
    this.clearFeedpostImages(feedpost, untouchedImages);

    feedpostApiRequest.images = newImagesToUpload;

    const formData = this.generateNewFeedPostFormData(feedpostApiRequest);

    const url: string = feedpost.url;

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
  private clearFeedpostImages(oldFeedpost: FeedPost, untouchedImages: UploadFile[]) {
    const imagesToDelete = oldFeedpost.images.filter(image => untouchedImages.findIndex(v => v.url === image.image) === -1);
    imagesToDelete.forEach(image => {
      this.deleteImage(image).subscribe(
        r => {
          // console.log('deleted:', image, r);
        }
      );
    })
  }

  public deleteImage(image: FeedPostImage) {
    return this.http.delete(image.url).pipe(
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

  public delete(feedPost: FeedPost) {
    return this.http.delete(feedPost.url)
  }
}
