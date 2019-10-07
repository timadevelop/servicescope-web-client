import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';

import { ServicesListComponent } from './components/services-list/services-list.component';
import { ServicesDetailComponent } from './components/services-detail/services-detail.component';

import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimilarServicesListComponent } from './components/similar-services-list/similar-services-list.component';
import { NewServiceFormComponent } from './components/new-service-form/new-service-form.component';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { JsonLabelValueEditorComponent } from './components/new-service-form/json-label-value-editor/json-label-value-editor.component';
import { PromotedServicesListComponent } from './components/promoted-services-list/promoted-services-list.component';
import { PromoteServiceComponent } from './components/promote-service/promote-service.component';
import { PromoteServiceUsingCouponComponent } from './components/promote-service/promote-service-using-coupon/promote-service-using-coupon.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { NzCardModule, NzGridModule, NzSpinModule, NzFormModule, NzInputModule, NzInputNumberModule, NzDividerModule, NzIconModule, NzButtonModule, NzModalModule, NzListModule, NzTagModule, NzPaginationModule, NzDrawerModule, NzPopconfirmModule } from 'ng-zorro-antd';
import { ImagesSelectorModule } from '../shared/images-selector/images-selector.module';
import { TagsSelectorModule } from '../shared/tags-selector/tags-selector.module';
import { CategorySelectorModule } from '../shared/category-selector/category-selector.module';
import { FiltersModule } from '../shared/filters/filters.module';
import { ListItemModule } from '../shared/list-item/list-item.module';
import { PayFormModule } from '../shared/pay-form/pay-form.module';
import { CarouselModule } from '../shared/carousel/carousel.module';
import { GeneralInfoCardModule } from '../shared/general-info-card/general-info-card.module';
import { CardButtonModule } from '../shared/card-button/card-button.module';
import { PriceCardModule } from '../shared/price-card/price-card.module';
import { VotesModule } from '../shared/votes/votes.module';
import { FooterModule } from '../shared/footer/footer.module';
import { AuthorCardModule } from '../shared/author-card/author-card.module';
import { ShareWidgetModule } from '../shared/share-widget/share-widget.module';
import { PhoneWrapperModule } from '../shared/phone-wrapper/phone-wrapper.module';

@NgModule({
  declarations: [
    ServicesListComponent,
    ServicesDetailComponent,
    SimilarServicesListComponent,
    PromotedServicesListComponent,
    CreateServiceComponent,
    EditServiceComponent,
    NewServiceFormComponent,
    PromoteServiceComponent,
    PromoteServiceUsingCouponComponent,
    JsonLabelValueEditorComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesRoutingModule,
    //
    NzGridModule,
    NzCardModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzDividerModule,
    NzIconModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzModalModule,
    NzListModule,
    NzTagModule,
    NzPaginationModule,
    NzDrawerModule,
    //
    ImagesSelectorModule,
    TagsSelectorModule,
    CategorySelectorModule,
    FiltersModule,
    ListItemModule,
    PayFormModule,
    CarouselModule,
    GeneralInfoCardModule,
    CardButtonModule,
    PriceCardModule,
    VotesModule,
    FooterModule,
    AuthorCardModule,
    ShareWidgetModule,
    PhoneWrapperModule,
  ],
  exports: [
    ServicesListComponent
  ]
})
export class ServicesModule { }
