import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss']
})
export class PriceCardComponent implements OnInit {

  @Input() price_details: any = null;
  @Input() price: number | string;
  @Input() currency: string;

  showPriceDetails: boolean = false;
  constructor() { }

  ngOnInit() {
    if (this.price_details instanceof Array && this.price_details.length > 0) {
      this.showPriceDetails = true;
    }
  }

}
