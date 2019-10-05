import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneWrapperComponent } from './phone-wrapper.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PhoneWrapperComponent],
  exports: [PhoneWrapperComponent]
})
export class PhoneWrapperModule { }
