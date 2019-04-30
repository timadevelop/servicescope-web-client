import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/shared/models/Service.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() item: Service | any;
  @Input() modelName: string = null;

  constructor(
  ) { }

  ngOnInit() {
    if (!this.item) {
      console.warn('No item provided to list-item component')
    }
  }

}
