import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayFormComponent } from './pay-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule, NzAlertModule, NzButtonModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzAlertModule,
    NzButtonModule
  ],
  declarations: [PayFormComponent],
  exports: [PayFormComponent]
})
export class PayFormModule { }
