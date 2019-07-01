import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { LocationService } from 'src/app/modules/shared/services/location.service';

import { Location } from 'src/app/core/models/Location.model';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  @Input() selectedLocation: Location;
  locations: PaginatedApiResponse<Location>;
  isLoading = false;

  private districtWordText = this.i18n({ value: "District", id: "districtText", description: "Simple district word" });

  nullLocation = new Location();

  @Output() onChange = new EventEmitter<Location>();
  @Input() size: 'large' | 'default' | 'small' = 'default';
  @Input() isFormItem: boolean = false;

  constructor(
    private i18n: I18n,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private msgService: NzMessageService,
    public tds: TargetDeviceService
  ) {
  }

  ngOnInit() {
    this.locationService.getMajorCities()
      .subscribe(mcs => {
        this.locations = mcs;
      });

    // this.search(this.i18n({value: "", id: "defaultLocationSearchQuery", description: "Default search query for location selector (later will be deprecated, we`ll use most popular locations)"})); // TODO get main locations

    this.nullLocation.name = this.isFormItem ? this.i18n({ value: "Select Location", id: 'selectLocationText' }) : this.i18n({ value: "Whole country", id: 'wholeCountryText' });
    if (!this.selectedLocation)
    {
      this.selectedLocation = this.nullLocation;
    }

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
    if (!location || location == this.nullLocation) return this.nullLocation.name;
    return `${location.t_v_m} ${location.name} - ${this.districtWordText} ${location.district.name}`
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
        this.msgService.info(this.i18n(
          {
            value: "You can search location by name",
            id: "warnUserAboutAbilityToSearchLocationInSearchSelector",
            description: "Notify user that he/she can search location by name instead of scrolling down a lot of time"
          }));
      }
    }
    this.locations = response;
  }

  locationChanged(l: Location) {
    this.selectedLocation = l;
    this.onChange.emit(this.selectedLocation == this.nullLocation ? null : this.selectedLocation);

    if (!this.isFormItem) {
      // update query params
      const queryParams: Params = { locationId: this.selectedLocation === null ? null : this.selectedLocation.id, page: 1 };
      this.updateQueryParams(queryParams);
    }
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
