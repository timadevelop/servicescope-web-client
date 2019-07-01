import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/modules/services/angular-services/services.service';
import { Title } from '@angular/platform-browser';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(
    private titleService: Title,
    private i18n: I18n
  ) {
    this.titleService.setTitle(this.i18n({ value: 'Services', id: "servicesHtmlTitle" }));
  }

  ngOnInit() {

  }

}
