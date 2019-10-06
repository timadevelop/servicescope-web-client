import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { NzAlertModule, NzAvatarModule, NzButtonModule, NzCarouselModule, NzIconModule, NzGridModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzCarouselModule,
    NzGridModule,
    NzIconModule,
    NzAlertModule,
    NzAvatarModule,
    NzButtonModule
  ],
  declarations: [CarouselComponent],
  exports: [CarouselComponent]
})
export class CarouselModule { }
