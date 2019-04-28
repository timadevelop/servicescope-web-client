import { Component, OnInit, Input, Output, EventEmitter, ɵConsole } from '@angular/core';
import { Location } from '../../models/Location.model';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  @Output() onChange = new EventEmitter<{ query: string, location: Location }>();
  selectedLocation: Location = null;
  query: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  search() {
    this.onChange.emit({ query: this.query, location: this.selectedLocation });
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.query = params.get('q');
    });
  }

  onLocationChange(location: Location) {
    this.selectedLocation = location;
  }
}
