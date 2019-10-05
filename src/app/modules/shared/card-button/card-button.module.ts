import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardButtonComponent } from './card-button.component';
import { NzCardModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzCardModule
  ],
  declarations: [CardButtonComponent],
  exports: [CardButtonComponent]
})
export class CardButtonModule { }
