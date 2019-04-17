import { Component, OnInit, Input } from '@angular/core';
import { Businesse } from '../business';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BusinesseService } from '../business.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {

  @Input() business: Businesse;

  business$: Observable<Businesse>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BusinesseService) { }

  ngOnInit() {
    console.log('oninit');
    this.business$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getBusinesse(parseInt(params.get('id')))
      )
    );
  }

  gotoBusinesses(business: Businesse) {
    let heroId = business ? business.id : null;
    // Pass along the business id if available
    // so that the List component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate([
      '../',
      { id: heroId, foo: 'foo' },
      { relativeTo: this.route }
    ]);
  }

}
