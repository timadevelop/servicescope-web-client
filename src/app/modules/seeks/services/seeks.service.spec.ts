import { TestBed } from '@angular/core/testing';

import { SeeksService } from './seeks.service';

describe('SeeksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const seek: SeeksService = TestBed.get(SeeksService);
    expect(seek).toBeTruthy();
  });
});
