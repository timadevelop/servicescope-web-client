import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/core/models/Location.model';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info-card.component.html',
  styleUrls: ['./general-info-card.component.scss']
})
export class GeneralInfoCardComponent implements OnInit {

  @Input() id: number | string;
  @Input() created_at: string;
  @Input() location: Location;
  @Input() category: string;
  @Input() justify: string = 'start';
  constructor() { }

  ngOnInit() {
  }

}
