import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledTextComponent } from './labeled-text.component';
import { NzInputModule, NzIconModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { RichTextEditorModule } from '../rich-text-editor/rich-text-editor.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzIconModule,
    RichTextEditorModule
  ],
  declarations: [LabeledTextComponent],
  exports: [LabeledTextComponent]
})
export class LabeledTextModule { }
