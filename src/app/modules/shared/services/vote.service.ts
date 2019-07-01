import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Vote } from '../../../core/models/Vote.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  // voting
  public upvote(model: string, id: number): Observable<Vote> {
    return this.http.post<Vote>(`${environment.apiUrl}/${model}/${id}/upvote/`, {})
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return throwError(error)
        })
      )
  }
  public downvote(model: string, id: number): Observable<Vote> {
    return this.http.post<Vote>(`${environment.apiUrl}/${model}/${id}/downvote/`, {})
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return throwError(error)
        })
      )
  }


  public cancelvote(vote: Vote): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/votes/${vote.id}/`, {})
      .pipe(
        catchError(error => {
          this.errorHandlerService.handleError(error);
          return throwError(error)
        })
      )
  }
}
