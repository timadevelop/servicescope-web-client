/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServicePromotionsService } from './service-promotions.service';

describe('Service: ServicePromotions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicePromotionsService]
    });
  });

  it('should ...', inject([ServicePromotionsService], (service: ServicePromotionsService) => {
    expect(service).toBeTruthy();
  }));
});
