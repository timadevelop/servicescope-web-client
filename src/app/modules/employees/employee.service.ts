import { Injectable } from '@angular/core';


import { Observable, of } from 'rxjs';

import { EMPLOYEES } from './mock-employees';
import { Employee } from './employee';
import { MessageService } from '../../core/services/message.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private messageService: MessageService) { }

  getEmployees(): Observable<Employee[]> {
    // TODO: send the message _after_ fetching the employees
    this.messageService.add('EmployeeService: fetched employees');
    return of(EMPLOYEES);
  }

  getEmployee(id:number): Observable<Employee> {
    // TODO: send the message _after_ fetching the employees
    this.messageService.add(`EmployeeService: fetched employee ${id}`);
    const result = EMPLOYEES.filter((e:Employee) => e.id == id)[0];
    console.log('result: ', result);
    return of(result);
  }
}
