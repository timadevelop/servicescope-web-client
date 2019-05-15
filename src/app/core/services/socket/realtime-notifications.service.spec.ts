/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RealtimeNotificationsService } from './realtime-notifications.service';

describe('Service: RealtimeNotifications', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealtimeNotificationsService]
    });
  });

  it('should ...', inject([RealtimeNotificationsService], (service: RealtimeNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
