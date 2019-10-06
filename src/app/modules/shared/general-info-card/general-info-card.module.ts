import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInfoCardComponent } from './general-info-card.component';
import { NzGridModule, NzIconModule, NzToolTipModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzGridModule,
    NzIconModule,
    NzToolTipModule
  ],
  declarations: [GeneralInfoCardComponent],
  exports: [GeneralInfoCardComponent]
})
export class GeneralInfoCardModule { }
