import { Component, OnInit, Input } from '@angular/core';
import { PriceDetailsRow } from 'src/app/core/models/Service.model';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss']
})
export class PriceCardComponent implements OnInit {

  @Input() price_details: Array<PriceDetailsRow> = null;
  @Input() price: number | string;
  @Input() currency: string;
  @Input() small: boolean = false;

  showPriceDetails: boolean = false;
  exposePriceDetails: boolean = false;
  constructor() { }

  ngOnInit() {
    if (this.price_details) this.price_details = this.price_details.filter(v => v.hasOwnProperty('label') && v.hasOwnProperty('value'));
    if (this.price_details instanceof Array && this.price_details.length > 0) {
      this.showPriceDetails = true;
    }
  }

  toggleExposePriceDetails() {
    this.exposePriceDetails = !this.exposePriceDetails;
  }
}
