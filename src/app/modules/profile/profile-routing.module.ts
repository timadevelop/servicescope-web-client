import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileResolverService } from '../../core/resolvers/profile-resolver.service';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { UsersListResolverService } from '../../core/resolvers/users-list-resolver.service';
import { ServicesListResolverService } from '../../core/resolvers/services-list-resolver.service';
import { FeedResolverService } from 'src/app/core/resolvers/feed-resolver.service';
import { ServicesListComponent } from '../services/services-list/services-list.component';
import { FeedComponent } from './feed/feed.component';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: ProfileListComponent,
        resolve: {
          users: UsersListResolverService
        },
        pathMatch: 'full',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      },
      {
        path: ':id',
        component: ProfileDetailComponent,
        resolve: {
          user: ProfileResolverService,
        },
        children: [
          {
            path: 'services',
            component: ServicesListComponent,
            resolve: {
              services: ServicesListResolverService,
            },
            runGuardsAndResolvers: 'paramsOrQueryParamsChange'

          },
          {
            path: 'feed',
            component: FeedComponent,
            resolve: {
              feed: FeedResolverService,
            },
            runGuardsAndResolvers: 'paramsOrQueryParamsChange'

          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'feed'
          }
        ]
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
