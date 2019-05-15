import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/core/models/Service.model';
import { NzMessageService } from 'ng-zorro-antd';
import { ServiceApiRequest } from 'src/app/core/models/api-request/service-api-request.model';
import { ServicesService } from 'src/app/core/services/services.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {
  loading = false;
  percent: number = null;

  constructor(
    private servicesService: ServicesService,
    private msgService: NzMessageService,
    private router: Router
  ) { }

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
            this.msgService.success(`Успешно направена обява #${id}`)
            this.router.navigate(['/services', id]);
          }
        },
        err => {
          // fail
          console.log(err);
          this.msgService.error("Error creating service");
        });

  }

}
