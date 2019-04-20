import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledTextComponent } from './components/labeled-text/labeled-text.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LabeledTextComponent
  ],
  exports: [
    LabeledTextComponent
  ]
})
export class SharedModule { }
