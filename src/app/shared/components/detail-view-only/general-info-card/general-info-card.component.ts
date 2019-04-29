import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../../../models/Tag.models';

@Component({
  selector: 'app-general-info-card',
  templateUrl: './general-info-card.component.html',
  styleUrls: ['./general-info-card.component.scss']
})
export class GeneralInfoCardComponent implements OnInit {

  @Input() id: number | string;
  @Input() created_at: string;
  @Input() location: Location;
  @Input() tags: Array<Tag>;

  constructor() { }

  ngOnInit() {
  }

}