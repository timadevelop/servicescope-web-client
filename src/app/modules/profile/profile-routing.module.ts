import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileResolverService } from './resolvers/profile-resolver.service';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { UsersListResolverService } from './resolvers/users-list-resolver.service';
import { ServicesListResolverService } from '../services/resolvers/services-list-resolver.service';
import { FeedResolverService } from 'src/app/modules/profile/resolvers/feed-resolver.service';
import { ServicesListComponent } from '../services/components/services-list/services-list.component';
import { FeedComponent } from './feed/feed.component';
import { SeeksListComponent } from '../seeks/components/seeks-list/seeks-list.component';
import { SeeksListResolverService } from '../seeks/resolvers/seeks-list-resolver.service';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [],
    children: [
      {
        path: 'feed/post/:feedId',
        component: FeedComponent,
        resolve: {
          feed: FeedResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
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
            data: {
              showCreateButton: false,
              showSearchBar: false,
              author_id_parent_parameter: 'id'
            },
            runGuardsAndResolvers: 'paramsOrQueryParamsChange'

          },
          {
            path: 'seeks',
            component: SeeksListComponent,
            resolve: {
              seeks: SeeksListResolverService,
            },
            data: {
              showCreateButton: false,
              showSearchBar: false,
              author_id_parent_parameter: 'id'
            },
            runGuardsAndResolvers: 'paramsOrQueryParamsChange'

          },
          {
            path: 'feed',
            component: FeedComponent,
            resolve: {
              feed: FeedResolverService,
            },
            data: {
              author_id_parent_parameter: 'id'
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
