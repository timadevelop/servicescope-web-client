import { TestBed } from '@angular/core/testing';

import { UsersListResolverService } from './users-list-resolver.service';

describe('UsersListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersListResolverService = TestBed.get(UsersListResolverService);
    expect(service).toBeTruthy();
  });
});
