import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCardComponent } from './search-card/search-card.component';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { OrderingFilterComponent } from './ordering-filter/ordering-filter.component';
import { LocationSearchComponent } from './location-search/location-search.component';
import { ListFiltersComponent } from './list-filters/list-filters.component';
import { NzDividerModule, NzDrawerModule, NzTagModule, NzIconModule, NzSelectModule, NzGridModule, NzInputModule, NzSliderModule, NzCardModule, NzFormModule, NzInputNumberModule, NzButtonModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorySelectorModule } from '../category-selector/category-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzButtonModule,
    NzDrawerModule,
    NzTagModule,
    NzSelectModule,
    NzIconModule,
    NzGridModule,
    NzInputModule,
    NzInputNumberModule,
    NzSliderModule,
    NzCardModule,
    NzFormModule,
    //
    CategorySelectorModule
  ],
  declarations: [
    PriceFilterComponent,
    SearchCardComponent,
    OrderingFilterComponent,
    LocationSearchComponent,
    ListFiltersComponent
  ],
  exports: [
    PriceFilterComponent,
    SearchCardComponent,
    OrderingFilterComponent,
    LocationSearchComponent,
    ListFiltersComponent
  ],
})
export class FiltersModule { }
