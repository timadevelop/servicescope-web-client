import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileResolverService } from './profile-resolver.service';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { UsersListResolverService } from './users-list-resolver.service';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: ProfileHomeComponent,
        children: [
          {
            path: ':id',
            component: ProfileDetailComponent,
            resolve: {
              user: ProfileResolverService
            },

          },
        ]
      },
      {
        path: '',
        component: ProfileListComponent,
        resolve: {
          users: UsersListResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        // data: { animation: 'items' },
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
