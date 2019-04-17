import { Component, OnInit, Input } from '@angular/core';
import { Business } from '../business';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BusinessService } from '../business.service';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/dialog.service';


@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {

  // @Input() business: Business;

  business: Business;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    private service: BusinessService) { }

  ngOnInit() {
    console.log('oninit');
    this.route.data
      .subscribe((data: { business: Business }) => {
        this.editName = data.business.name;
        this.business = data.business;
      });

    // this.business$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getBusiness(parseInt(params.get('id')))
    //   )
    // );
  }

  gotoBusinesses(business: Business) {
    let id = business ? business.id : null;
    // Pass along the business id if available
    // so that the List component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate([
      '../',
      { id: id, foo: 'foo' }
    ]);
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    // if (!this.business || this.business.name === this.business.name) {
    //   return true;
    console.log('here');
    // }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

}
