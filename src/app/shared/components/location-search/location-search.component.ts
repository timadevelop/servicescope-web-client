import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { LocationService } from '../../services/location.service';

import { Location } from '../../models/Location.model';
import { PaginatedApiResponse } from '../../models/api-response/paginated-api-response';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  selectedLocationString: string = 'null';
  locations: PaginatedApiResponse<Location>;
  isLoading = false;

  @Output() onChange = new EventEmitter<Location>();
  @Input() size: 'large' | 'default' | 'small' = 'default';

  constructor(
    private msgService: NzMessageService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.search("а"); // TODO get main locations
  }

  locationChanged(l: Location) {
    this.onChange.emit(l);
  }

  getLabel(location: Location): string {
    return `${location.t_v_m} ${location.name} - област ${location.district.name}`
  }

  search(query: string) {
    if (!query) { return; }
    this.isLoading = true;
    this.locationService.search(query).subscribe(r => {
      this.locations = r;
      console.log(r);
      this.isLoading = false;
    });
  }

  trackIdentifyByItemId(index, item) {
    return item.id;
  }

  loadMoreLocations() {

  }
}
