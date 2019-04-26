import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../../models/Location.model';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  @Output() onChange = new EventEmitter<{ query: string, location: Location }>();
  selectedLocation: Location = null;

  constructor() { }

  search(query: string) {
    this.onChange.emit({ query: query, location: this.selectedLocation });
  }
  ngOnInit() {
  }

  onLocationChange(location: Location) {
    this.selectedLocation = location;
  }
}
