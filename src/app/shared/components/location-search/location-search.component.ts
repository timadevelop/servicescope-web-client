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
  isLoadingCategories = false;

  constructor(
    private msgService: NzMessageService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
  }

  search(query: string) {
    this.isLoadingCategories = true;
    if (!query) { return; }
    this.locationService.searchGeo(query).subscribe(r => {
      this.locations = r;
      this.isLoadingCategories = false;
    });
    // if (!query) {
    //   this.oldQuery = null;
    //   return;
    // };
    // if (query.includes(this.oldQuery)) {
    //   return;
    // }

    // this.oldQuery = query;
    // this.isLoadingCategories = true;

    // return this.placePredictionService.getPlacePredictions(query).subscribe((s: Array<google.maps.places.AutocompletePrediction>) => {
    //   this.locations = s;
    //   this.isLoadingCategories = false;
    // });
  }

  trackIdentifyByItemId(index, item) {
    return index;
  }

  loadMoreLocations() {

  }
}
