import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceCardComponent } from './price-card.component';
import { NzAlertModule, NzCardModule, NzDividerModule, NzCollapseModule } from 'ng-zorro-antd';
import { LabelValueRowModule } from '../label-value-row/label-value-row.module';

@NgModule({
  imports: [
    CommonModule,
    LabelValueRowModule,
    NzAlertModule,
    NzCardModule,
    NzDividerModule,
    NzCollapseModule,
  ],
  declarations: [PriceCardComponent],
  exports: [PriceCardComponent]
})
export class PriceCardModule { }
