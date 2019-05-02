import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Tag } from '../models/Tag.models';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';
import { CustomEncoder } from './custom.encoder';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService) {
  }

  public getTagById(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${environment.apiUrl}/tags/${id}/`);
  }

  public getTagByName(name: string): Observable<Tag> {
    return this.http.get<Tag>(`${environment.apiUrl}/tags/name/${name}/`);
  }

  public getTags(page: string, pageSize: string, query: string = null): Observable<PaginatedApiResponse<Tag>> {
    let params = new HttpParams({ encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

    if (query) {
      params = params.set('search', query);
    }

    const options =
      { params: params };

    return this.http.get<PaginatedApiResponse<Tag>>(`${environment.apiUrl}/tags/`, options);
  }

  public getNextTags(next: string): Observable<PaginatedApiResponse<Tag>> {
    return this.http.get<PaginatedApiResponse<Tag>>(next);
  }

  public createTag(name: string, color: string = null): Observable<Tag> {
    const tag = new Tag();
    tag.name = name;
    if (color) {
      tag.color = color;
    }
    return this.http.post<Tag>(`${environment.apiUrl}/tags/`, tag)
      .pipe(
        catchError(e => this.handleError(e))
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
      this.messageService.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
