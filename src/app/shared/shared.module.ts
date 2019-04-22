import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledTextComponent } from './components/labeled-text/labeled-text.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { PhoneWrapperComponent } from './components/phone-wrapper/phone-wrapper.component';
import { EmailWrapperComponent } from './components/email-wrapper/email-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
  ],
  declarations: [
    LabeledTextComponent,
    AuthorCardComponent,
    PhoneWrapperComponent,
    EmailWrapperComponent
  ],
  exports: [
    LabeledTextComponent,
    AuthorCardComponent,
    PhoneWrapperComponent,
    EmailWrapperComponent
  ]
})
export class SharedModule { }
