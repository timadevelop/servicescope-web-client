import { Injectable } from '@angular/core';


import { Observable, of } from 'rxjs';

import { EMPLOYEES } from './mock-businesses';
import { Businesse } from './business';
import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class BusinesseService {

  constructor(private messageService: MessageService) { }

  getBusinesses(): Observable<Businesse[]> {
    // TODO: send the message _after_ fetching the businesses
    this.messageService.add('BusinesseService: fetched businesses');
    return of(EMPLOYEES);
  }

  getBusinesse(id:number): Observable<Businesse> {
    // TODO: send the message _after_ fetching the businesses
    this.messageService.add(`BusinesseService: fetched business ${id}`);
    const result = EMPLOYEES.filter((e:Businesse) => e.id == id)[0];
    console.log('result: ', result);
    return of(result);
  }
}
