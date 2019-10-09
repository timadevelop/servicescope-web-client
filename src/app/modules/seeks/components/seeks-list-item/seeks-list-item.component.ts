import { Component, OnInit, Input } from '@angular/core';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { Seek } from 'src/app/core/models/Seek.model';

@Component({
  selector: 'app-seeks-list-item',
  templateUrl: './seeks-list-item.component.html',
  styleUrls: ['./seeks-list-item.component.scss']
})
export class SeeksListItemComponent implements OnInit {

  @Input() promoted: boolean = false;
  @Input() item: Seek;

  constructor(
    public tds: TargetDeviceService
  ) { }

  ngOnInit() {
    if (!this.item) {
      console.warn('No item provided to seeks-list-item component')
    }
  }

}
