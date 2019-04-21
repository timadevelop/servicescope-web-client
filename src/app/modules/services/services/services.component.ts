import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {

  }

}
