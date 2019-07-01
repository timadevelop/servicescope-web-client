/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConversationsService } from './conversations.service';

describe('Service: Conversations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversationsService]
    });
  });

  it('should ...', inject([ConversationsService], (service: ConversationsService) => {
    expect(service).toBeTruthy();
  }));
});
