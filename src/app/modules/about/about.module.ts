import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { TermsComponent } from './terms/terms.component';
import { AboutRoutingModule } from './about-routing.module';
import { WrapperComponent } from './wrapper/wrapper.component';
import { NzCardModule, NzDividerModule, NzMenuModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    AboutRoutingModule,
    NzCardModule,
    NzDividerModule,
    NzMenuModule
  ],
  declarations: [
    WrapperComponent,
    AboutComponent,
    FaqComponent,
    TermsComponent
  ]
})
export class AboutModule { }
