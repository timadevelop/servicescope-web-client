import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, CanLoad, Route } from '@angular/router';
import { ConversationsService } from './services/conversations.service';
import { Observable, of, Subscription } from 'rxjs';
import { Conversation } from 'src/app/shared/models/Conversation.model';
import { mapTo, map, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { ConversationApiRequest } from 'src/app/shared/models/api-request/conversation-api-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private userService: UserService,
    private conversationsService: ConversationsService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    let userId = next.paramMap.get('id');
    return this.checkConversation(+userId);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    return true;
  }

  checkConversation(userId: number): Observable<boolean> {
    return this.conversationsService.getByUserId(userId)
      .pipe(
        map((conversation: Conversation) => {
          this.router.navigate(['/', 'messages', 'c', conversation.id]);
          return true;
        }),
        catchError(_ => {
          console.log('here');
          this.userService.getUserById(userId).subscribe(user => {
            console.log('user');
            const cr = new ConversationApiRequest(
              "New Conversation",
              [this.userService.currentUser.url, user.url]
            );

            return this.conversationsService.create(cr).subscribe(newConversation => {
              this.router.navigate(['/', 'messages', 'c', newConversation.id]);
            });
          });
          return of(false);
        })
      );
  }
}
