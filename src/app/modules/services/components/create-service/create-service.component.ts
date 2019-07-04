import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/core/models/Service.model';
import { NzMessageService } from 'ng-zorro-antd';
import { ServiceApiRequest } from 'src/app/core/models/api-request/service-api-request.model';
import { ServicesService } from 'src/app/modules/services/angular-services/services.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {
  loading = false;
  percent: number = null;

  creatingItemProgressText: string;
  constructor(
    private servicesService: ServicesService,
    private msgService: NzMessageService,
    private router: Router,
    public i18n: I18n,
    private titleService: Title
  ) {
    this.creatingItemProgressText = this.i18n({ value: 'Creating', id: 'creatingItemProgressText' });
    this.titleService.setTitle(this.i18n({ value: 'Create Service', id: "createServiceHtmlTitle" }));
  }

  ngOnInit() {
  }

  createNewService(service: ServiceApiRequest) {
    this.loading = true;
    this.servicesService.create(service)
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
                  value: "Successfully created service #{{id}}",
                  id: 'newServiceCreatedMessageText'
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
                value: "Error creating service",
                id: "newServiceCreatingErrorText",
                description: "Message notifies user about an error while creating new service"
              }));
        });

  }
}
