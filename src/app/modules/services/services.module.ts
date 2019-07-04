import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';

import { ServicesListComponent } from './components/services-list/services-list.component';
import { ServicesDetailComponent } from './components/services-detail/services-detail.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimilarServicesListComponent } from './components/similar-services-list/similar-services-list.component';
import { NewServiceFormComponent } from './components/new-service-form/new-service-form.component';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { JsonLabelValueEditorComponent } from './components/new-service-form/json-label-value-editor/json-label-value-editor.component';
import { PromotedServicesListComponent } from './components/promoted-services-list/promoted-services-list.component';
import { PromoteServiceComponent } from './components/promote-service/promote-service.component';
import { SharedModule } from '../shared/shared.module';
import { PromoteServiceUsingCouponComponent } from './components/promote-service/promote-service-using-coupon/promote-service-using-coupon.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';

@NgModule({
  declarations: [
    ServicesListComponent,
    ServicesDetailComponent,
    SimilarServicesListComponent,
    PromotedServicesListComponent,
    CreateServiceComponent,
    EditServiceComponent,
    NewServiceFormComponent,
    PromoteServiceComponent,
    PromoteServiceUsingCouponComponent,
    JsonLabelValueEditorComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ServicesRoutingModule,
    SharedModule
  ],
  exports: [
    ServicesListComponent
  ]
})
export class ServicesModule { }
