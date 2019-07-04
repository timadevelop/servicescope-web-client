import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/modules/services/angular-services/services.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Title } from '@angular/platform-browser';
import { ServiceApiRequest } from 'src/app/core/models/api-request/service-api-request.model';
import { Service } from 'src/app/core/models/Service.model';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
  loading = false;
  percent: number = null;

  service: Service;
  creatingItemProgressText: string;
  constructor(
    private servicesService: ServicesService,
    private msgService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    public i18n: I18n,
    private titleService: Title
  ) {
    this.creatingItemProgressText = this.i18n({ value: 'Editing', id: 'editingItemProgressText' });
    this.titleService.setTitle(this.i18n({ value: 'Edit Service', id: "editServiceHtmlTitle" }));
  }

  ngOnInit() {
    this.route.data
    .subscribe((data: { service: Service }) => {
      if (!data.service) {
        console.warn('Not found service');
        // this.router.navigate(['/404'])
        return;
      }
      this.service = data.service;
    });

  }

  updateService(serviceApiRequest: ServiceApiRequest) {
    this.loading = true;
    this.servicesService.update(this.service, serviceApiRequest)
      .subscribe(
        (event: HttpEvent<{}>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              this.percent = (event.loaded / event.total!) * 100;
            }
          } else if (event instanceof HttpResponse) {
            // uploaded
            this.loading = false;
            const newService = event.body;
            const id = newService['id'];
            this.msgService.success(
              this.i18n(
                {
                  value: "Successfully updated service #{{id}}",
                  id: 'serviceUpdatedMessageText'
                }, { id: id }));
            this.router.navigate(['/services', id]);
          }
        },
        err => {
          // fail
          // console.log(err);
          this.msgService.error(
            this.i18n(
              {
                value: "Error updating service",
                id: "serviceUpdateErrorText",
                description: "Message notifies user about an error while updating service"
              }));
        });

  }
}
