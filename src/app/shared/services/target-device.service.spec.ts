/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TargetDeviceService } from './target-device.service';

describe('Service: TargetDevice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TargetDeviceService]
    });
  });

  it('should ...', inject([TargetDeviceService], (service: TargetDeviceService) => {
    expect(service).toBeTruthy();
  }));
});
