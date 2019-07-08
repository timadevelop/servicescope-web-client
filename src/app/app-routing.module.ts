import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComposeMessageComponent } from './app-components/compose-message/compose-message.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'profiles',
    loadChildren: './modules/profile/profile.module#ProfileModule',
    // canLoad: [AuthGuard]
  },
  {
    path: 'messages',
    loadChildren: './modules/messages/messages.module#MessagesModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule',
  },
  {
    path: 'services',
    loadChildren: './modules/services/services.module#ServicesModule',
  },
  { path: '', redirectTo: 'services', pathMatch: 'full' },
  {
    path: '',
    loadChildren: './modules/about/about.module#AboutModule',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    // initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
