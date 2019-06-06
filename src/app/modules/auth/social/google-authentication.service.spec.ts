/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleAuthenticationService } from './google-authentication.service';

describe('Service: GoogleAuthentication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAuthenticationService]
    });
  });

  it('should ...', inject([GoogleAuthenticationService], (service: GoogleAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
