import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailWrapperComponent } from './email-wrapper.component';
import { NzIconModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule
  ],
  declarations: [EmailWrapperComponent],
  exports: [EmailWrapperComponent]
})
export class EmailWrapperModule { }
