import { Component, OnInit, Input } from '@angular/core';
import { ServiceImage } from '../../models/Service.model';
import { NzCarouselComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() images: Array<ServiceImage>;

  constructor() { }

  ngOnInit() {
  }

}
