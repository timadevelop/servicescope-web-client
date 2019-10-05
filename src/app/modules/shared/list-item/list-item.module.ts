import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { VotesModule } from '../votes/votes.module';
import { NzListModule, NzAvatarModule, NzIconModule, NzTagModule, NzDividerModule, NzGridModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzListModule,
    NzAvatarModule,
    NzIconModule,
    NzTagModule,
    NzDividerModule,
    NzGridModule,
    //
    VotesModule,
  ],
  declarations: [ListItemComponent],
  exports: [ListItemComponent]
})
export class ListItemModule { }
