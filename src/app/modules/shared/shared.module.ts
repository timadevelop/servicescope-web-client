import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledTextComponent } from './components/common/labeled-text/labeled-text.component';
import { AuthorCardComponent } from './components/common/author-card/author-card.component';
import { NgZorroAntdModule, NzMessageService } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { PhoneWrapperComponent } from './components/common/phone-wrapper/phone-wrapper.component';
import { EmailWrapperComponent } from './components/common/email-wrapper/email-wrapper.component';
import { LocationSearchComponent } from './components/list-view-only/filter-components/location-search/location-search.component';
import { FormsModule } from '@angular/forms';
import { SearchCardComponent } from './components/list-view-only/filter-components/search-card/search-card.component';
import { CarouselComponent } from './components/detail-view-only/carousel/carousel.component';
import { LabelValueRowComponent } from './components/common/label-value-row/label-value-row.component';
import { VotesComponent } from './components/common/votes/votes.component';
import { PriceFilterComponent } from './components/list-view-only/filter-components/price-filter/price-filter.component';
import { GeneralInfoCardComponent } from './components/detail-view-only/general-info-card/general-info-card.component';
import { PriceCardComponent } from './components/detail-view-only/price-card/price-card.component';
import { ListFiltersComponent } from './components/list-view-only/list-filters/list-filters.component';
import { OrderingFilterComponent } from './components/list-view-only/filter-components/ordering-filter/ordering-filter.component';
import { ListItemComponent } from './components/list-view-only/list-item/list-item.component';
import { CategorySelectorComponent } from './components/common/category-selector/category-selector.component';
import { TagsSelectorComponent } from './components/common/tags-selector/tags-selector.component';
import { ImagesSelectorComponent } from './components/common/images-selector/images-selector.component';
import { LinkifyPipe } from './pipes/linkify.pipe';
import { ProfileAvatarUploaderComponent } from './components/common/profile-avatar-uploader/profile-avatar-uploader.component';
import { PayFormComponent } from './components/common/pay-form/pay-form.component';
import { ShareWidgetComponent } from './components/common/share-widget/share-widget.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CardButtonComponent } from './components/common/card-button/card-button.component';
import { MapComponent } from './components/common/map/map.component';

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
    LocationSearchComponent,
    SearchCardComponent,
    CarouselComponent,
    LabelValueRowComponent,
    VotesComponent,
    PriceFilterComponent,
    GeneralInfoCardComponent,
    PriceCardComponent,
    ListFiltersComponent,
    OrderingFilterComponent,
    ListItemComponent,
    CategorySelectorComponent,
    TagsSelectorComponent,
    ImagesSelectorComponent,
    ProfileAvatarUploaderComponent,
    PayFormComponent,
    ShareWidgetComponent,
    FooterComponent,
    CardButtonComponent,
    MapComponent,
    // pipes
    LinkifyPipe
  ],
  exports: [
    LabeledTextComponent,
    AuthorCardComponent,
    PhoneWrapperComponent,
    EmailWrapperComponent,
    LocationSearchComponent,
    SearchCardComponent,
    CarouselComponent,
    LabelValueRowComponent,
    VotesComponent,
    PriceFilterComponent,
    GeneralInfoCardComponent,
    PriceCardComponent,
    ListFiltersComponent,
    OrderingFilterComponent,
    ListItemComponent,
    CategorySelectorComponent,
    TagsSelectorComponent,
    ImagesSelectorComponent,
    ProfileAvatarUploaderComponent,
    PayFormComponent,
    ShareWidgetComponent,
    FooterComponent,
    CardButtonComponent,
    MapComponent,
    // pipes
    LinkifyPipe
  ]
})
export class SharedModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [ SocketService, ChatService, RealtimeNotificationsService, ConfigService ]
  //   }
  // }
}
