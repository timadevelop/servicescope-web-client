import { Component, OnInit, Input } from '@angular/core';
import { Tag } from 'src/app/core/models/Tag.models';
import { Location } from 'src/app/core/models/Location.model';
import { Category } from 'src/app/core/models/Category.models';

@Component({
  selector: 'app-general-info-card',
  templateUrl: './general-info-card.component.html',
  styleUrls: ['./general-info-card.component.scss']
})
export class GeneralInfoCardComponent implements OnInit {

  @Input() id: number | string;
  @Input() created_at: string;
  @Input() location: Location;
  @Input() category: string;
  @Input() tags: Array<Tag>;
  @Input() vertical: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
