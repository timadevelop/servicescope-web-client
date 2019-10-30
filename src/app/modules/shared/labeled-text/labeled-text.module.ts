import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledTextComponent } from './labeled-text.component';
import { NzInputModule, NzIconModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzIconModule
  ],
  declarations: [LabeledTextComponent],
  exports: [LabeledTextComponent]
})
export class LabeledTextModule { }
