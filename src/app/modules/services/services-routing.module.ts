import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { ServicesHomeComponent } from './services-home/services-home.component';
import { ServicesDetailComponent } from './services-detail/services-detail.component';
import { ServicesResolverService } from './services-resolver.service';
import { ServicesListComponent } from './services-list/services-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { ServicesListResolverService } from './services-list-resolver.service';

const servicesRoutes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ServicesHomeComponent,
        children: [
          {
            path: ':id',
            component: ServicesDetailComponent,
            // canDeactivate: [CanDeactivateGuard],
            resolve: {
              service: ServicesResolverService
            },
            // data: { animation: 'item' },
          },
          {
            path: '',
            component: ServicesListComponent,
            resolve: {
              services: ServicesListResolverService
            },
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            // data: { animation: 'items' },
          }
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(servicesRoutes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
