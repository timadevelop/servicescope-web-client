/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FacebookAuthenticationService } from './facebook-authentication.service';

describe('Service: FacebookAuthentication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookAuthenticationService]
    });
  });

  it('should ...', inject([FacebookAuthenticationService], (service: FacebookAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
