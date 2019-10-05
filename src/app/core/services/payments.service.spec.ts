/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaymentsService } from './payments.service';

describe('Service: Payments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentsService]
    });
  });

  it('should ...', inject([PaymentsService], (service: PaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
