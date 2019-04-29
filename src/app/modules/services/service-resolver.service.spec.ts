import { TestBed } from '@angular/core/testing';

import { ServiceResolverService } from './service-resolver.service';

describe('ServiceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceResolverService = TestBed.get(ServiceResolverService);
    expect(service).toBeTruthy();
  });
});
