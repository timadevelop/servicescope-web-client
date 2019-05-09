/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConversationResolverService } from './conversation-resolver.service';

describe('Service: ConversationResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversationResolverService]
    });
  });

  it('should ...', inject([ConversationResolverService], (service: ConversationResolverService) => {
    expect(service).toBeTruthy();
  }));
});
