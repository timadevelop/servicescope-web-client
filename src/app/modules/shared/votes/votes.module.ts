import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotesComponent } from './votes.component';
import { NzIconModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule
  ],
  declarations: [VotesComponent],
  exports: [VotesComponent]
})
export class VotesModule { }
