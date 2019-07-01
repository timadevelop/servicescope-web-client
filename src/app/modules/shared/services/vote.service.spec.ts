/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VoteService } from './vote.service';

describe('Service: Vote', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoteService]
    });
  });

  it('should ...', inject([VoteService], (service: VoteService) => {
    expect(service).toBeTruthy();
  }));
});
