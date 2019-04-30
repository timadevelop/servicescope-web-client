import { Component, OnInit, Input } from '@angular/core';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';
import { Service } from 'src/app/shared/models/Service.model';
import { ServicesService } from 'src/app/shared/services/services.service';
import { Router, Params } from '@angular/router';
import { Tag } from 'src/app/shared/models/Tag.models';

@Component({
  selector: 'app-similar-services-list',
  templateUrl: './similar-services-list.component.html',
  styleUrls: ['./similar-services-list.component.scss']
})
export class SimilarServicesListComponent implements OnInit {
  paginatedServices: PaginatedApiResponse<Service>;
  pageSize: number = 10;
  page: number = 1;

  @Input() service: Service;

  constructor(
    private router: Router,
    private servicesService: ServicesService) { }

  ngOnInit() {
    if (this.service) {
      this.loadSimilarServices();
    } else {
      console.warn("No service parameter provided to similar-services-list");
    }
  }

  loadSimilarServices() {
    const filters = this.service.tags.map(tag => {
      return { param: 'tags', value: tag.name };
    });

    const query = null;
    return this.servicesService.getServices(this.page + '', '' + this.pageSize, query, filters)
      .subscribe(r => this.paginatedServices = r);
  }

  navigateToAllSimilarServices() {
    const selectedTagStrings = this.service.tags.map((v: Tag, i: number, arr) => v.name);

    const queryParams: Params = { tags: selectedTagStrings };

    this.router.navigate(
      ['/services'],
      {
        queryParams: queryParams,
      });
  }

}
