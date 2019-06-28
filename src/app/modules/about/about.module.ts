import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { TermsComponent } from './terms/terms.component';
import { AboutRoutingModule } from './about-routing.module';
import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgZorroAntdModule,
    AboutRoutingModule
  ],
  declarations: [
    WrapperComponent,
    AboutComponent,
    FaqComponent,
    TermsComponent
  ]
})
export class AboutModule { }
