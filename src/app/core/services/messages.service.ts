import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { Message } from '../models/Message.model';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { MessageApiRequest } from '../models/api-request/message-api-request.model';
import { UploadFile } from 'ng-zorro-antd';
import { catchError } from 'rxjs/operators';
import { CustomEncoder } from './custom.encoder';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private http: HttpClient,
    private errorHandlerMessage: ErrorHandlerService) {
  }

  public getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${environment.apiUrl}/messages/${id}/`);
  }


  private generateNewMessageFormData(message: MessageApiRequest): FormData {
    const formData = new FormData();

    for (var key in message) {
      if (key == 'images') {
        // images
        message.images.forEach((value: UploadFile, index: number, array) => {
          formData.append(`image_${index}`, value.originFileObj);
        });

      } else {
        formData.append(key, message[key]);
      }
    }

    return formData;
  }

  public create(message: MessageApiRequest): Observable<HttpEvent<{}>> {
    const formData = this.generateNewMessageFormData(message);

    const url: string = `${environment.apiUrl}/messages/`;

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      withCredentials: true,
    });

    return this.http.request(req).pipe(
      catchError(error => {
        this.errorHandlerMessage.handleError(error);
        return throwError(error);
      })
    );
  }


  public getMessages(
    page: string,
    pageSize: string,
    query: string = null,
    filters: Array<{ param: string, value: string }> = []
  ): Observable<PaginatedApiResponse<Message>> {
    let params = new HttpParams({ encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

    if (query) {
      params = params.set('search', query);
    }

    for (let item of filters) {
      params = params.append(item.param, item.value);
    }

    params = params.append('ordering', '-created_at');

    const options =
      { params: params };

    return this.http.get<PaginatedApiResponse<Message>>(`${environment.apiUrl}/messages/`, options)
      .pipe(
        catchError(error => {
          this.errorHandlerMessage.handleError(error);
          return throwError(error);
        })
      );
  }

  public getConversationMessages(conversationId: number, page: string, pageSize: string): Observable<PaginatedApiResponse<Message>> {
    let filters = [{
      param: "conversation__id",
      value: conversationId.toString()
    }];
    return this.getMessages(page, pageSize, null, filters);
  }

  public getNext(nextUrl: string): Observable<PaginatedApiResponse<Message>> {
    return this.http.get<PaginatedApiResponse<Message>>(nextUrl);
  }

  public delete(messageId: number): Observable<{}> {
    return this.http.delete<{}>(`${environment.apiUrl}/messages/${messageId}/`);
  }
}
