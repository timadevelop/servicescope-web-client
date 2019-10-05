import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { NzAlertModule, NzAvatarModule, NzButtonModule, NzCarouselModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzCarouselModule,
    NzAlertModule,
    NzAvatarModule,
    NzButtonModule
  ],
  declarations: [CarouselComponent],
  exports: [CarouselComponent]
})
export class CarouselModule { }
