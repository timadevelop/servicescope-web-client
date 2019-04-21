import { TestBed } from '@angular/core/testing';

import { ServicesListResolverService } from './services-list-resolver.service';

describe('ServicesListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesListResolverService = TestBed.get(ServicesListResolverService);
    expect(service).toBeTruthy();
  });
});
