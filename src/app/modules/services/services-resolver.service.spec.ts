import { TestBed } from '@angular/core/testing';

import { ServicesResolverService } from './services-resolver.service';

describe('ServicesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesResolverService = TestBed.get(ServicesResolverService);
    expect(service).toBeTruthy();
  });
});
