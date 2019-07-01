import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Tag } from '../../../core/models/Tag.models';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { PaginatedApiResponse } from '../../../core/models/api-response/paginated-api-response';
import { CustomEncoder } from '../../../core/services/custom.encoder';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
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
        catchError(e => this.errorHandlerService.handleError(e))
      );
  }



}
