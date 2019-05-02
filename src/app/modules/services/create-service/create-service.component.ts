import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/shared/models/Service.model';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {

  constructor(
    private msgService: NzMessageService
  ) { }

  ngOnInit() {
  }

  createNewService(service: Service) {
    this.msgService.info('creating!!');
  }

}
