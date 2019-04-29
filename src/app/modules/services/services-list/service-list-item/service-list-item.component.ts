import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/shared/models/Service.model';

@Component({
  selector: 'app-service-list-item',
  templateUrl: './service-list-item.component.html',
  styleUrls: ['./service-list-item.component.scss']
})
export class ServiceListItemComponent implements OnInit {

  @Input() service: Service;

  constructor() {}

  ngOnInit() {
    if (!this.service) {
      console.warn("No service object was given to service-list-item component");
    }
  }

}
