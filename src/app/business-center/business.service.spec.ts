/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BusinesseService } from './business.service';

describe('Service: Businesse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinesseService]
    });
  });

  it('should ...', inject([BusinesseService], (service: BusinesseService) => {
    expect(service).toBeTruthy();
  }));
});
