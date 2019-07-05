import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/Feedback.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  LAST_FEEDBACK_KEY = 'LAST_USER_FEEDBACK';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  public getById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${environment.apiUrl}/feedback/${id}/`);
  }


  public create(r: { text: string, rate: number }): Observable<Feedback> {
    return this.http.post<Feedback>(`${environment.apiUrl}/feedback/`, r)
      .pipe(
        catchError(e => this.errorHandlerService.handleError(e))
      );
  }

  public storeInLocalStorage(feedback: Feedback) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.LAST_FEEDBACK_KEY, JSON.stringify(feedback));
    }
  }

  public getLastFeedback(): Feedback {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.LAST_FEEDBACK_KEY)) as Feedback;
    } else {
      return null;
    }
  }

  public removeLastFeedbackFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.LAST_FEEDBACK_KEY);
    }
  }

}
