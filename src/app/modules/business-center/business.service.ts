import { Injectable } from '@angular/core';


import { Observable, of } from 'rxjs';

import { EMPLOYEES } from './mock-businesses';
import { Business } from './business';
import { MessageService } from '../../shared/services/message.service';


@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private messageService: MessageService) { }

  getBusinesses(): Observable<Business[]> {
    // TODO: send the message _after_ fetching the businesses
    this.messageService.add('BusinessService: fetched businesses');
    return of(EMPLOYEES);
  }

  getBusiness(id:number): Observable<Business> {
    // TODO: send the message _after_ fetching the businesses
    this.messageService.add(`BusinessService: fetched business ${id}`);
    const result = EMPLOYEES.filter((e:Business) => e.id == id)[0];
    console.log('result: ', result);
    return of(result);
  }
}
