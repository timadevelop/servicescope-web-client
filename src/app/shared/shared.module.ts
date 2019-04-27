import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledTextComponent } from './components/labeled-text/labeled-text.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { PhoneWrapperComponent } from './components/phone-wrapper/phone-wrapper.component';
import { EmailWrapperComponent } from './components/email-wrapper/email-wrapper.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { FormsModule } from '@angular/forms';
import { SearchCardComponent } from './components/search-card/search-card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LabelValueRowComponent } from './components/label-value-row/label-value-row.component';
import { VotesComponent } from './components/votes/votes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgZorroAntdModule,
  ],
  declarations: [
    LabeledTextComponent,
    AuthorCardComponent,
    PhoneWrapperComponent,
    EmailWrapperComponent,
    PageNotFoundComponent,
    LocationSearchComponent,
    SearchCardComponent,
    CarouselComponent,
    LabelValueRowComponent,
    VotesComponent
  ],
  exports: [
    LabeledTextComponent,
    AuthorCardComponent,
    PhoneWrapperComponent,
    EmailWrapperComponent,
    PageNotFoundComponent,
    LocationSearchComponent,
    SearchCardComponent,
    CarouselComponent,
    LabelValueRowComponent,
    VotesComponent
  ]
})
export class SharedModule { }
