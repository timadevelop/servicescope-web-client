import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileResolverService } from './profile-resolver.service';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileServicesListComponent } from './profile-detail/profile-services-list/profile-services-list.component';
import { ProfilePostsListComponent } from './profile-detail/profile-posts-list/profile-posts-list.component';
import { ProfileOffersListComponent } from './profile-detail/profile-offers-list/profile-offers-list.component';
import { ProfileReviewsListComponent } from './profile-detail/profile-reviews-list/profile-reviews-list.component';
import { AuthGuard } from '../auth/auth.guard';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProfileHomeComponent,
        children: [
          {
            path: ':id',
            component: ProfileDetailComponent,
            // canDeactivate: [CanDeactivateGuard],
            resolve: {
              user: ProfileResolverService
            },
            data: { animation: 'item' },
            children: [
              {
                path: '',
                redirectTo: 'services',
                pathMatch: 'full'
              },
              {
                path: 'services',
                component: ProfileServicesListComponent,
              },
              {
                path: 'posts',
                component: ProfilePostsListComponent,
              },
              {
                path: 'offers',
                component: ProfileOffersListComponent,
              },
              {
                path: 'reviews',
                component: ProfileReviewsListComponent,
              },
            ]
          },
          {
            path: '',
            component: ProfileListComponent,
            data: { animation: 'items' },
          }
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
