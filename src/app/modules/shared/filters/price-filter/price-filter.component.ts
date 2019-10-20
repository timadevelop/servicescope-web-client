import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent implements OnInit {

  @Input() min: number = 0;
  @Input() max: number = 300;
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
      this.adjustMaxValue(this.priceMax);
    });
  }

  onSliderEvent(range: [number, number]) {
    this.priceMin = range[0];
    this.priceMax = range[1];
    this.adjustMaxValue();
  }

  onMaxChange(v: number) {
    this.priceMax = v;
    this.adjustMaxValue(v);
  }


  onMinChange(v: number) {
    if (v > this.priceMax) {
      this.priceMin = this.priceMax;
    } else {
      this.priceMin = v;
    }
    this.adjustMaxValue();
  }

  adjustMaxValue(selectedMax: number = null) {
    let v = selectedMax || this.priceMax;

    if (v > this.max) {
      // increase if overflow
      this.max = v * 1.5;
    } else if (this.max - v < this.max * 0.15) {
      // auto increase max value if priceMax is in last 10% of allowed range
      this.max = this.max * 1.5;
    } else if (this.max - v > this.max * 0.85 && v > 10) {
      // auto decrease max value if priceMax is in first 10% of allowed range
      this.max = this.priceMax * 1.5;
    }
    const diff = this.priceMax - this.priceMin
    if (diff > 0 && diff < this.max * 0.25) {
      const delta = diff > 5 ? diff * 0.25 : 2;
      if (this.priceMin - delta > 0) this.min = this.priceMin - delta;
      this.max = this.priceMax + delta;
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
