import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/Feedback.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  LAST_FEEDBACK_KEY = 'LAST_USER_FEEDBACK';

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  public getById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${environment.apiUrl}/feedback/${id}/`);
  }


  public create(r: {text: string, rate: number}): Observable<Feedback> {
    return this.http.post<Feedback>(`${environment.apiUrl}/feedback/`, r)
      .pipe(
        catchError(e => this.errorHandlerService.handleError(e))
      );
  }

  public storeInLocalStorage(feedback: Feedback) {
    localStorage.setItem(this.LAST_FEEDBACK_KEY, JSON.stringify(feedback));
  }

  public getLastFeedback(): Feedback {
    return JSON.parse(localStorage.getItem(this.LAST_FEEDBACK_KEY)) as Feedback;
  }

  public removeLastFeedbackFromLocalStorage() {
    localStorage.removeItem(this.LAST_FEEDBACK_KEY);
  }

}
