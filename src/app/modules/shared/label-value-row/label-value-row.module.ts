import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelValueRowComponent } from './label-value-row.component';
import { RouterModule } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzGridModule
  ],
  declarations: [LabelValueRowComponent],
  exports: [LabelValueRowComponent]
})
export class LabelValueRowModule { }
