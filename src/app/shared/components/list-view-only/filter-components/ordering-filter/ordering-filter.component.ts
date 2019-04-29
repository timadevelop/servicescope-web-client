import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-ordering-filter',
  templateUrl: './ordering-filter.component.html',
  styleUrls: ['./ordering-filter.component.scss']
})
export class OrderingFilterComponent implements OnInit {

  ordering: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.ordering = params.get('ordering');
    });
  }

  changeOrdering(newOrdering: string) {
    // this.ordering = newOrdering;
    // update query params
    const queryParams: Params = { ordering: newOrdering || null, page: 1 };
    this.updateQueryParams(queryParams);
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
