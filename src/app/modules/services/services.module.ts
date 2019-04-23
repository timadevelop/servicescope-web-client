import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';

import { ServicesComponent } from './services/services.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServicesDetailComponent } from './services-detail/services-detail.component';
import { ServicesHomeComponent } from './services-home/services-home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '../../shared/shared.module';
import { ServicesFiltersCardComponent } from './services-list/services-filters-card/services-filters-card.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ServicesComponent,
    ServicesListComponent,
    ServicesDetailComponent,
    ServicesHomeComponent,
    ServicesFiltersCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgZorroAntdModule,
    ServicesRoutingModule,
  ]
})
export class ServicesModule { }
