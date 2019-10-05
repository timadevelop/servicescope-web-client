import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareWidgetComponent } from './share-widget.component';
import { NzGridModule, NzButtonModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzGridModule,
    NzButtonModule
  ],
  declarations: [ShareWidgetComponent],
  exports: [ShareWidgetComponent]
})
export class ShareWidgetModule { }
