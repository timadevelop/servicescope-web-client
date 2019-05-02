import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';

import { ServicesDetailComponent } from './services-detail/services-detail.component';
import { ServiceResolverService } from '../../shared/resolvers/service-resolver.service';
import { ServicesListComponent } from './services-list/services-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { ServicesListResolverService } from '../../shared/resolvers/services-list-resolver.service';
import { Route } from '@angular/compiler/src/core';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { CreateServiceComponent } from './create-service/create-service.component';


const servicesListRouteTemplate = {
  component: ServicesListComponent,
  resolve: {
    services: ServicesListResolverService
  },
  runGuardsAndResolvers: 'paramsOrQueryParamsChange'
};

const servicesRoutes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    canActivate: [],
    children: [
      {
        path: '',
        pathMatch: 'full',
        ...servicesListRouteTemplate,
      } as Route,
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
            ...servicesListRouteTemplate
          } as Route,
        ]
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
