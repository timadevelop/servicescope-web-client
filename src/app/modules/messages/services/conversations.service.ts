import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Conversation } from 'src/app/core/models/Conversation.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { CustomEncoder } from 'src/app/core/services/custom.encoder';
import { ConversationApiRequest } from 'src/app/core/models/api-request/conversation-api-request.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {


  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  public getById(id: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${environment.apiUrl}/conversations/${id}/`);
  }

  public getByUserId(uid: string | number): Observable<Conversation> {
    return this.http.get<Conversation>(`${environment.apiUrl}/conversations/get_by_user_id/${uid}/`);
  }

  public create(conversationRequest: ConversationApiRequest): Observable<Conversation> {
    return this.http.post<Conversation>(`${environment.apiUrl}/conversations/`, conversationRequest)
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return throwError(error);
        })
      );
  }



  @Cacheable({
    maxAge: 40 * 100
  })
  public getConversations(
    page: string,
    pageSize: string,
    query: string = null,
    filters: Array<{ param: string, value: string }> = []
  ): Observable<PaginatedApiResponse<Conversation>> {
    let params = new HttpParams({ encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

    if (query) {
      params = params.set('search', query);
    }

    for (let item of filters) {
      params = params.append(item.param, item.value);
    }

    params = params.append('ordering', '-updated_at');

    const options =
      { params: params };

    return this.http.get<PaginatedApiResponse<Conversation>>(`${environment.apiUrl}/conversations/`, options)
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return throwError(error);
        })
      );
  }

  public getNext(nextUrl: string): Observable<PaginatedApiResponse<Conversation>> {
    return this.http.get<PaginatedApiResponse<Conversation>>(nextUrl);
  }

}
