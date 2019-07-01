import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, CanLoad, Route, ParamMap } from '@angular/router';
import { ConversationsService } from './services/conversations.service';
import { Observable, of } from 'rxjs';
import { Conversation } from 'src/app/core/models/Conversation.model';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { ConversationApiRequest } from 'src/app/core/models/api-request/conversation-api-request.model';
import { Location } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';


export class AdditionalConversationRouteData {
  itemUrl: string;
  itemTitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private userService: UserService,
    private conversationsService: ConversationsService,
    private router: Router,
    private nzMessageService: NzMessageService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    let userId = next.paramMap.get('id');
    return this.checkConversation(+userId, next.queryParamMap);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    return true;
  }

  additionalData: AdditionalConversationRouteData = null;

  checkConversation(userId: number, queryParamMap: ParamMap): Observable<boolean> {
    this.additionalData = { itemUrl: queryParamMap.get('itemUrl'), itemTitle: queryParamMap.get('itemTitle') };
    return this.conversationsService.getByUserId(userId)
      .pipe(
        switchMap((conversation: Conversation) => {
          this.router.navigate(['/', 'messages', 'c', conversation.id], {queryParams: this.additionalData});
          return of(true);
        }),
        catchError(_ =>
          this.userService.getUserById(userId).pipe(
            switchMap(user => {
              return this.createNewService(user);
            }),
            catchError(err => {
              this.nzMessageService.error(`Not found user with id ${userId}`)
              this.router.navigate(['/', 'messages']);
              return of(false);
            }))
        )
      );
  }


  private createNewService(user): Observable<boolean> {
    const cr = new ConversationApiRequest(
      "New Conversation",
      [this.userService.currentUser.url, user.url]
    );

    return this.conversationsService.create(cr).pipe(
      switchMap(newConversation => {
        this.router.navigate(['/', 'messages', 'c', newConversation.id], { queryParams: this.additionalData});
        return of(true);
      }),
      catchError(e => {
        return of(false);
      })
    );
  }
}
