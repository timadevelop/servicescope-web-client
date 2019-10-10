import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/core/models/Service.model';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';

@Component({
  selector: 'app-services-list-item',
  templateUrl: './services-list-item.component.html',
  styleUrls: ['./services-list-item.component.scss']
})
export class ServicesListItemComponent implements OnInit {

  @Input() promoted: boolean = false;
  @Input() item: Service | any;
  @Input() modelName: string = null;

  constructor(
    public tds: TargetDeviceService
  ) { }

  ngOnInit() {
    if (!this.item) {
      console.warn('No item provided to services-list-item component')
    }
  }

}
