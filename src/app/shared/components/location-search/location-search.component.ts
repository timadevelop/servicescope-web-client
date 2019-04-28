import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { LocationService } from '../../services/location.service';

import { Location } from '../../models/Location.model';
import { PaginatedApiResponse } from '../../models/api-response/paginated-api-response';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  selectedLocation: Location;
  locations: PaginatedApiResponse<Location>;
  isLoading = false;

  @Output() onChange = new EventEmitter<Location>();
  @Input() size: 'large' | 'default' | 'small' = 'default';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private msgService: NzMessageService
  ) { }

  ngOnInit() {
    this.search("а"); // TODO get main locations

    this.route.queryParamMap.subscribe(params => {
      const lidstring = params.get('locationId');

      if (lidstring) {
        this.locationService.getById(lidstring)
          .subscribe(l => {
            this.selectedLocation = l;
          });
      }
    });
  }

  getLabel(location: Location): string {
    return `${location.t_v_m} ${location.name} - област ${location.district.name}`
  }

  search(query: string) {
    if (!query) { return; }
    this.isLoading = true;
    this.locationService.search(query).subscribe(r => {
      this.locations = r;
      // console.log(r);
      this.isLoading = false;
    });
  }

  trackIdentifyByItemId(index, item) {
    return item.id;
  }

  loadMoreLocations() {
    if (this.locations && this.locations.next) {
      this.isLoading = true;
      this.locationService.getNext(this.locations.next)
        .subscribe(v => {
          this.appendLocations(v);
          this.isLoading = false;
        });
    }
  }

  private appendLocations(response: PaginatedApiResponse<Location>) {
    if (this.locations) {
      const set = new Set([...this.locations.results, ...response.results]);
      response.results = Array.from(set.values());
      if (response.results.length > 300) {
        this.msgService.info("Възможно е да търсите локация по име");
      }
    }
    this.locations = response;
  }

  locationChanged(l: Location) {
    this.selectedLocation = l;
    this.onChange.emit(this.selectedLocation);

    // update query params
    const queryParams: Params = { locationId: this.selectedLocation === null ? null : this.selectedLocation.id, page: 1 };
    this.updateQueryParams(queryParams);
  }


  /*
  * Route helper
  */
  private updateQueryParams(queryParams: Params) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: "merge", // remove to replace all query params by provided
      });
  }
}
