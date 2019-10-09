/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CouponsService } from './coupons.service';

describe('Seek: Coupons', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CouponsService]
    });
  });

  it('should ...', inject([CouponsService], (seek: CouponsService) => {
    expect(seek).toBeTruthy();
  }));
});
