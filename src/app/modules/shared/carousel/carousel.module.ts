import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { NzAlertModule, NzAvatarModule, NzButtonModule, NzCarouselModule, NzIconModule, NzGridModule, NzToolTipModule } from 'ng-zorro-antd';
import { TiCarouselComponent, CarouselItemElement } from './ti-carousel/ti-carousel/ti-carousel.component';
import { CarouselItemDirective } from './ti-carousel/ti-carousel/ti-carousel-item.directive';

@NgModule({
  imports: [
    CommonModule,
    NzCarouselModule,
    NzGridModule,
    NzIconModule,
    NzAlertModule,
    NzAvatarModule,
    NzButtonModule,
    NzToolTipModule
  ],
  declarations: [
    CarouselItemDirective,
    CarouselItemElement,
    TiCarouselComponent,
    CarouselComponent
  ],
  exports: [CarouselComponent]
})
export class CarouselModule { }
