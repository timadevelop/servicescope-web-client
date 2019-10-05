/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TagsService } from './tags.service';

describe('Service: Tags', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagsService]
    });
  });

  it('should ...', inject([TagsService], (service: TagsService) => {
    expect(service).toBeTruthy();
  }));
});
