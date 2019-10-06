import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareWidgetComponent } from './share-widget.component';
import { NzGridModule, NzButtonModule, NzIconModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzGridModule,
    NzIconModule,
    NzButtonModule
  ],
  declarations: [ShareWidgetComponent],
  exports: [ShareWidgetComponent]
})
export class ShareWidgetModule { }
