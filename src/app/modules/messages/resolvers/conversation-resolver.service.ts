import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Conversation } from '../../../shared/models/Conversation.model';
import { ConversationsService } from 'src/app/modules/messages/services/conversations.service';
import { Observable, EMPTY, of } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationResolverService implements Resolve<Conversation>{

  constructor(
    private conversationsService: ConversationsService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Conversation> | Observable<never> {

    let id = route.paramMap.get('id');

    if (isNaN(+id)) {
      console.warn('service id is NaN');
      return EMPTY;
    }

    return this.conversationsService.getById(+id).pipe(
      take(1),
      mergeMap((conversation: Conversation) => {
        if (conversation) {
          return of(conversation);
        } else { // id not found
          // this.router.navigate(['/']);
          return EMPTY;
        }
      }),
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return EMPTY;
      })
    );
  }
}
