import { TestBed } from '@angular/core/testing';

import { BusinessCenterDetailResolverService } from './business-center-detail-resolver.service';

describe('BusinessCenterDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessCenterDetailResolverService = TestBed.get(BusinessCenterDetailResolverService);
    expect(service).toBeTruthy();
  });
});
