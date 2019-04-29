import { Component, OnInit, Input, Renderer } from '@angular/core';
import { ServiceImage } from '../../../models/Service.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() images: Array<ServiceImage>;

  zoomView: boolean = false;

  constructor(
    private renderer: Renderer
  ) { }

  ngOnInit() {
  }

  zoom(v: boolean) {
    this.zoomView = v;
  }
}
