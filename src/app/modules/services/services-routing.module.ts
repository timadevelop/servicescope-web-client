import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';

import { ServicesDetailComponent } from './services-detail/services-detail.component';
import { ServiceResolverService } from '../../core/resolvers/service-resolver.service';
import { ServicesListComponent } from './services-list/services-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { ServicesListResolverService } from '../../core/resolvers/services-list-resolver.service';
import { PageNotFoundComponent } from 'src/app/core/components/page-not-found/page-not-found.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { PromoteServiceComponent } from './promote-service/promote-service.component';

const servicesRoutes: Routes = [
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ServicesListComponent,
        resolve: {
          services: ServicesListResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path: 'create',
        component: CreateServiceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'category',
        children: [
          {
            path: '',
            component: PageNotFoundComponent,
            pathMatch: 'full'
          },
          {
            path: ':category',
            component: ServicesListComponent,
            resolve: {
              services: ServicesListResolverService
            },
            runGuardsAndResolvers: 'paramsOrQueryParamsChange'
          }
        ]
      },
      {
        path: ':id/promote',
        component: PromoteServiceComponent,
        canActivate: [AuthGuard],
        resolve: {
          service: ServiceResolverService
        },
      },
      {

        path: ':id',
        component: ServicesDetailComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          service: ServiceResolverService
        },
      },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(servicesRoutes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
