import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeksDetailComponent } from './components/seeks-detail/seeks-detail.component';
import { SeekResolverService } from './resolvers/seek-resolver.service';
import { SeeksListComponent } from './components/seeks-list/seeks-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { SeeksListResolverService } from './resolvers/seeks-list-resolver.service';
import { PageNotFoundComponent } from 'src/app/core/components/page-not-found/page-not-found.component';
import { CreateSeekComponent } from './components/create-seek/create-seek.component';
import { PromoteSeekComponent } from './components/promote-seek/promote-seek.component';
import { EditSeekComponent } from './components/edit-seek/edit-seek.component';

const seeksRoutes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SeeksListComponent,
        resolve: {
          seeks: SeeksListResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path: 'create',
        component: CreateSeekComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id/promote',
        component: PromoteSeekComponent,
        canActivate: [AuthGuard],
        resolve: {
          seek: SeekResolverService
        },
      },
      {
        path: ':id/edit',
        component: EditSeekComponent,
        canActivate: [AuthGuard],
        resolve: {
          seek: SeekResolverService
        },
      },
      {

        path: ':id',
        component: SeeksDetailComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          seek: SeekResolverService
        },
      },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(seeksRoutes)],
  exports: [RouterModule]
})
export class SeeksRoutingModule { }
