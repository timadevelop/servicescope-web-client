import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/animations';

@Component({
  selector: 'app-business-center-home',
  templateUrl: './business-center-home.component.html',
  styleUrls: ['./business-center-home.component.scss'],
  animations: [slideInAnimation]
})
export class BusinessCenterHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation'];
  }
}
