import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/core/models/Service.model';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() item: Service | any;
  @Input() modelName: string = null;

  constructor(
    public tds: TargetDeviceService
  ) { }

  ngOnInit() {
    if (!this.item) {
      console.warn('No item provided to list-item component')
    }
  }

}
