import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee: Employee;

  employee$: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EmployeeService) { }

  ngOnInit() {
    console.log('oninit');
    this.employee$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getEmployee(parseInt(params.get('id')))
        )
    );
  }

  gotoEmployees(employee: Employee) {
    let heroId = employee ? employee.id : null;
    // Pass along the employee id if available
    // so that the List component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/employees', { id: heroId, foo: 'foo' }]);
  }

}
