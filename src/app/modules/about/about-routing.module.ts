import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/core/components/page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { FaqComponent } from './faq/faq.component';
import { WrapperComponent } from './wrapper/wrapper.component';

const aboutRoutes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'terms',
        component: TermsComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
