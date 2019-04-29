import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledTextComponent } from './components/common/labeled-text/labeled-text.component';
import { AuthorCardComponent } from './components/common/author-card/author-card.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { PhoneWrapperComponent } from './components/common/phone-wrapper/phone-wrapper.component';
import { EmailWrapperComponent } from './components/common/email-wrapper/email-wrapper.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LocationSearchComponent } from './components/list-view-only/filter-components/location-search/location-search.component';
import { FormsModule } from '@angular/forms';
import { SearchCardComponent } from './components/list-view-only/filter-components/search-card/search-card.component';
import { CarouselComponent } from './components/detail-view-only/carousel/carousel.component';
import { LabelValueRowComponent } from './components/common/label-value-row/label-value-row.component';
import { VotesComponent } from './components/common/votes/votes.component';
import { PriceFilterComponent } from './components/list-view-only/filter-components/price-filter/price-filter.component';
import { GeneralInfoCardComponent } from './components/detail-view-only/general-info-card/general-info-card.component';
import { PriceCardComponent } from './components/detail-view-only/price-card/price-card.component';
import { FiltersCardComponent } from './components/list-view-only/filters-card/filters-card.component';
import { OrderingFilterComponent } from './components/list-view-only/filter-components/ordering-filter/ordering-filter.component';
import { ListItemComponent } from './components/list-view-only/list-item/list-item.component';

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
    VotesComponent,
    PriceFilterComponent,
    GeneralInfoCardComponent,
    PriceCardComponent,
    FiltersCardComponent,
    OrderingFilterComponent,
    ListItemComponent,
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
    VotesComponent,
    PriceFilterComponent,
    GeneralInfoCardComponent,
    PriceCardComponent,
    FiltersCardComponent,
    OrderingFilterComponent,
    ListItemComponent
  ]
})
export class SharedModule { }
