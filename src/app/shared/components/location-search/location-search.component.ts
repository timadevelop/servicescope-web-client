import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { LocationService } from '../../services/location.service';
import { GeoSearchResult } from '../../models/GeoSearchResult';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  selectedLocationString: string;
  locations: Array<GeoSearchResult> = [];
  isLoading = false;

  constructor(
    private msgService: NzMessageService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.search("а");
  }

  search(query: string) {
    if (!query) { return; }
    this.isLoading = true;
    this.locationService.searchGeo(query).subscribe(r => {
      this.locations = r;
      this.isLoading = false;
    });
  }

  trackIdentifyByItemId(index, item) {
    return index;
  }

  loadMoreLocations() {

  }
}
