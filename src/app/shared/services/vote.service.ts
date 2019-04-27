import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Vote } from '../models/Vote.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient,
    private messageService: NzMessageService) { }

  // voting
  public upvote(model: string, id: number): Observable<Vote> {
    return this.http.post<Vote>(`${environment.apiUrl}/${model}/${id}/upvote/`, {})
      .pipe(
        catchError(error => {
          this.handleError(error);
          return throwError(error)
        })
      )
  }
  public downvote(model: string, id: number): Observable<Vote> {
    return this.http.post<Vote>(`${environment.apiUrl}/${model}/${id}/downvote/`, {})
      .pipe(
        catchError(error => {
          this.handleError(error);
          return throwError(error)
        })
      )
  }


  public cancelvote(vote: Vote): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/votes/${vote.id}/`, {})
      .pipe(
        catchError(error => {
          this.handleError(error);
          return throwError(error)
        })
      )
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

      if(error.error instanceof Object) {
        for(let key in error.error) {
          this.messageService.error(`${key}: ${error.error[key]}`);
        }
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
