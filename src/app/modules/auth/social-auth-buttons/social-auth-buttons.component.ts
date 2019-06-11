import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/app/core/models/User.model';

@Component({
  selector: 'app-social-auth-buttons',
  templateUrl: './social-auth-buttons.component.html',
  styleUrls: ['./social-auth-buttons.component.scss']
})
export class SocialAuthButtonsComponent implements OnInit {
  authIsLoaded: boolean;
  isLoggedInGoogle: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.initGoogle();
    this.initFacebook();
  }

  private initGoogle() {
    this.authService.googleAuthenticationService.isLoaded$.subscribe(value => {
      this.authIsLoaded = value;
    });
    this.authService.googleAuthenticationService.isLoggedIn$.subscribe(value => {
      this.isLoggedInGoogle = value;
    });

    this.authService.googleAuthenticationService.loadAuth2();
  }


  private initFacebook() {
    this.authService.facebookAuthenticationService.isLoaded$.subscribe(value => {
      this.authIsLoaded = value;
    });
    this.authService.facebookAuthenticationService.isLoggedIn$.subscribe(value => {
      this.isLoggedInGoogle = value;
    });

    this.authService.facebookAuthenticationService.loadAuth2();
  }

  onGoogleButtonClick() {
    this.authService.googleAuthenticationService.signIn();
  }

  onFacebookButtonClick() {
    this.authService.facebookAuthenticationService.signIn();
  }

}
