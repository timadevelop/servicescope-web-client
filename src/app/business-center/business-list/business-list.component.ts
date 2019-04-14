import { Component, OnInit } from '@angular/core';
import { Businesse } from '../business';
import { BusinesseService } from '../business.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  businesses$: Observable<Businesse[]>;
  selectedId: number;


  constructor(private businessService: BusinesseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBusinesses();
  }

  // onSelect(business: Businesse): void {
  //   this.selectedBusinesse = business;
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
