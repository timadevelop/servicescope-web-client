import { Component, OnInit } from '@angular/core';
import { Business } from '../business';
import { BusinessService } from '../business.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  businesses$: Observable<Business[]>;
  selectedId: number;


  constructor(private businessService: BusinessService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBusinesses();
  }

  // onSelect(business: Business): void {
  //   this.selectedBusiness = business;
  // }

  getBusinesses(): void {
    this.businesses$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.businessService.getBusinesses();
      })
    );
  }
}
