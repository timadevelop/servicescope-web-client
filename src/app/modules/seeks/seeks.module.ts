import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeeksRoutingModule } from './seeks-routing.module';

import { SeeksListComponent } from './components/seeks-list/seeks-list.component';
import { SeeksDetailComponent } from './components/seeks-detail/seeks-detail.component';

import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimilarSeeksListComponent } from './components/similar-seeks-list/similar-seeks-list.component';
import { NewSeekFormComponent } from './components/new-seek-form/new-seek-form.component';
import { CreateSeekComponent } from './components/create-seek/create-seek.component';
import { PromotedSeeksListComponent } from './components/promoted-seeks-list/promoted-seeks-list.component';
import { PromoteSeekComponent } from './components/promote-seek/promote-seek.component';
import { PromoteSeekUsingCouponComponent } from './components/promote-seek/promote-seek-using-coupon/promote-seek-using-coupon.component';
import { EditSeekComponent } from './components/edit-seek/edit-seek.component';
import { NzCardModule, NzGridModule, NzSpinModule, NzFormModule, NzInputModule, NzInputNumberModule, NzDividerModule, NzIconModule, NzButtonModule, NzModalModule, NzListModule, NzTagModule, NzPaginationModule, NzDrawerModule, NzPopconfirmModule, NzAvatarModule } from 'ng-zorro-antd';
import { ImagesSelectorModule } from '../shared/images-selector/images-selector.module';
import { TagsSelectorModule } from '../shared/tags-selector/tags-selector.module';
import { CategorySelectorModule } from '../shared/category-selector/category-selector.module';
import { FiltersModule } from '../shared/filters/filters.module';
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
import { RouterModule } from '@angular/router';
import { SeeksListItemComponent } from './components/seeks-list-item/seeks-list-item.component';

@NgModule({
  declarations: [
    SeeksListComponent,
    SeeksListItemComponent,
    SeeksDetailComponent,
    SimilarSeeksListComponent,
    PromotedSeeksListComponent,
    CreateSeekComponent,
    EditSeekComponent,
    NewSeekFormComponent,
    PromoteSeekComponent,
    PromoteSeekUsingCouponComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SeeksRoutingModule,
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
    NzAvatarModule,
    //
    ImagesSelectorModule,
    TagsSelectorModule,
    CategorySelectorModule,
    FiltersModule,
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
    SeeksListComponent
  ]
})
export class SeeksModule { }
