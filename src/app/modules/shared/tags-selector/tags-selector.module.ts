import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsSelectorComponent } from './tags-selector.component';
import { NzSelectModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule
  ],
  declarations: [TagsSelectorComponent],
  exports: [TagsSelectorComponent]
})
export class TagsSelectorModule { }
