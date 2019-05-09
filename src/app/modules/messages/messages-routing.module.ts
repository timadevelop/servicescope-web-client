import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';

import { MessagesDetailComponent } from './messages-detail/messages-detail.component';
import { AuthGuard } from '../auth/auth.guard';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { ConversationResolverService } from './resolvers/conversation-resolver.service';

const messagesRoutes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'c',
        children: [
          {
            path: '',
            component: PageNotFoundComponent,
            pathMatch: 'full'
          },
          {
            path: ':id',
            component: MessagesDetailComponent,
            // canDeactivate: [CanDeactivateGuard],
            resolve: {
              conversation: ConversationResolverService
            },
          }
        ]
      }
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(messagesRoutes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
