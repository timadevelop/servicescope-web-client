import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesDetailComponent } from './components/services-detail/services-detail.component';
import { ServiceResolverService } from './resolvers/service-resolver.service';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { ServicesListResolverService } from './resolvers/services-list-resolver.service';
import { PageNotFoundComponent } from 'src/app/core/components/page-not-found/page-not-found.component';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { PromoteServiceComponent } from './components/promote-service/promote-service.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';

const servicesRoutes: Routes = [
  {
    path: '',
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
        path: ':id/promote',
        component: PromoteServiceComponent,
        canActivate: [AuthGuard],
        resolve: {
          service: ServiceResolverService
        },
      },
      {
        path: ':id/edit',
        component: EditServiceComponent,
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
