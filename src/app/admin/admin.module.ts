import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageBusinessesComponent } from './manage-businesses/manage-businesses.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    ManageBusinessesComponent,
    ManageEmployeesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
