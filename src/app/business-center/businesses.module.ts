import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessesRoutingModule } from './businesses-routing.module';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { FormsModule } from '@angular/forms';
import { BusinessCenterComponent } from './business-center/business-center.component';
import { BusinessCenterHomeComponent } from './business-center-home/business-center-home.component';

@NgModule({
  declarations: [
    BusinessListComponent,
    BusinessDetailComponent,
    BusinessCenterComponent,
    BusinessCenterHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BusinessesRoutingModule
  ]
})
export class BusinessesModule { }
