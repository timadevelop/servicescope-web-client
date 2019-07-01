/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CouponsService } from './coupons.service';

describe('Service: Coupons', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CouponsService]
    });
  });

  it('should ...', inject([CouponsService], (service: CouponsService) => {
    expect(service).toBeTruthy();
  }));
});
