/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeedResolverService } from './feed-resolver.service';

describe('Service: FeedResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedResolverService]
    });
  });

  it('should ...', inject([FeedResolverService], (service: FeedResolverService) => {
    expect(service).toBeTruthy();
  }));
});
