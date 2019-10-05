import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { NzIconModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule
  ],
  declarations: [MapComponent],
  exports: [MapComponent]
})
export class MapModule { }
