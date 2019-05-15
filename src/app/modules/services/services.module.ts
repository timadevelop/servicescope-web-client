import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';

import { ServicesComponent } from './services/services.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServicesDetailComponent } from './services-detail/services-detail.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimilarServicesListComponent } from './similar-services-list/similar-services-list.component';
import { NewServiceFormComponent } from './create-service/new-service-form/new-service-form.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { JsonLabelValueEditorComponent } from './create-service/new-service-form/json-label-value-editor/json-label-value-editor.component';

@NgModule({
  declarations: [
    ServicesComponent,
    ServicesListComponent,
    ServicesDetailComponent,
    SimilarServicesListComponent,
    CreateServiceComponent,
    NewServiceFormComponent,
    JsonLabelValueEditorComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ServicesRoutingModule,
  ],
  exports: [
    ServicesListComponent
  ]
})
export class ServicesModule { }
