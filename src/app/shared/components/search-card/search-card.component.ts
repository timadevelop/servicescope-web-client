import { Component, OnInit, Input, Output, EventEmitter, ɵConsole } from '@angular/core';
import { Location } from '../../models/Location.model';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  @Output() onChange = new EventEmitter<string>();
  query: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  search() {
    this.onChange.emit(this.query);
    // TODO filter location
    const queryParams: Params = { q: this.query, page: 1 };
    this.updateQueryParams(queryParams);
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.query = params.get('q');
    });
  }

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
