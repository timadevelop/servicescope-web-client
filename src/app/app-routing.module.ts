import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComposeMessageComponent } from './app-components/compose-message/compose-message.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'profiles',
    loadChildren: './modules/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'services',
    loadChildren: './modules/services/services.module#ServicesModule',
    // canLoad: [AuthGuard]
  },
  { path: '', redirectTo: '/businesses', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
