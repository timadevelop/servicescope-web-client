/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BusinessService } from './business.service';

describe('Service: Business', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessService]
    });
  });

  it('should ...', inject([BusinessService], (service: BusinessService) => {
    expect(service).toBeTruthy();
  }));
});
