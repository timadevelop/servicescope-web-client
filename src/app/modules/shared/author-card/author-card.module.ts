import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorCardComponent } from './author-card.component';
import { NzDividerModule, NzAvatarModule, NzCardModule, NzIconModule, NzButtonModule, NzGridModule } from 'ng-zorro-antd';
import { LabelValueRowModule } from '../label-value-row/label-value-row.module';
import { MapModule } from '../map/map.module';
import { RouterModule } from '@angular/router';
import { PhoneWrapperModule } from '../phone-wrapper/phone-wrapper.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzGridModule,
    NzIconModule,
    NzButtonModule,
    NzDividerModule,
    NzAvatarModule,
    NzCardModule,
    MapModule,
    LabelValueRowModule,
    PhoneWrapperModule
  ],
  declarations: [AuthorCardComponent],
  exports: [AuthorCardComponent]
})
export class AuthorCardModule { }
