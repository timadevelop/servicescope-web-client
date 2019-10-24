import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';

const INITIAL_MAX_PRICE = 300;

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent implements OnInit {

  @Input() min: number = 0;
  @Input() max: number = INITIAL_MAX_PRICE;
  @Input() currency: string = 'BGN';

  priceMin: number;
  priceMax: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.priceMin = params.get('price_min') === null ? null : +params.get('price_min');
      this.priceMax = params.get('price_max') === null ? null : +params.get('price_max');
      this.adjustSliderValues();
    });
  }

  onSliderEvent(range: [number, number]) {
    this.priceMin = range[0];
    this.priceMax = range[1];
    this.adjustSliderValues();
  }

  onMaxChange(v: number) {
    this.priceMax = v;
    this.adjustSliderValues();
  }


  onMinChange(v: number) {
    this.priceMin = v;
    this.adjustSliderValues();
  }

  adjustSliderValues() {
    // adjust max
    if (!this.priceMax) {
      this.max = INITIAL_MAX_PRICE;
    } else if (this.priceMax > this.max) {
      // increase if overflow
      this.max = this.priceMax * 1.5;
    } else if (this.max - this.priceMax < this.max * 0.15) {
      // auto increase max value if priceMax is in last 10% of allowed range
      this.max = this.max * 1.5;
    } else if (this.max - this.priceMax > this.max * 0.85 && this.priceMax > 10) {
      // auto decrease max value if priceMax is in first 10% of allowed range
      this.max = this.priceMax * 1.5;
    }

    // adjust min
    if (!this.priceMin) {
      this.min = 0;
    }

    // adjust small middle
    const diff = this.priceMax - this.priceMin
    if (diff > 0 && diff < this.max * 0.25) {
      const delta = diff > 5 ? diff * 0.25 : 2;

      this.max = this.priceMax + delta;

      if (!this.priceMin) {
        //
      } else if (this.min > this.priceMin) {
        this.min = this.priceMin;
      } else if (this.priceMin - delta > 0) {
        this.min = this.priceMin - delta;
      }
    }

  }

  generateMarks() {

    let marks: any = {
      [this.min]: `${this.min.toFixed(0)}`,
      [this.max]: `${this.max.toFixed(1)}`,
    }

    if (this.priceMax) {
      marks[this.priceMax] = {
        style: {
          color: '#f50'
        },
        label: `${this.priceMax.toFixed(1)}`
      };
    }
    return marks;
  }

  filter() {
    // update query params
    const queryParams: Params = { price_min: this.priceMin || null, price_max: this.priceMax || null, page: 1 };
    this.updateQueryParams(queryParams);
  }

  clear() {
    this.priceMin = null;
    this.priceMax = null;
    this.adjustSliderValues();
    this.filter();
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
