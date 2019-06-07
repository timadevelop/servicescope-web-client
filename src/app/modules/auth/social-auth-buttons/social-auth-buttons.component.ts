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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.googleAuthenticationService.isLoaded$.subscribe(value => {
      this.authIsLoaded = value;
    });

    this.authService.googleAuthenticationService.isLoggedIn$.subscribe(value => {
      this.isLoggedInGoogle = value;
    });

    this.authService.googleAuthenticationService.loadAuth2();
  }

  onGoogleButtonClick() {
    this.authService.googleAuthenticationService.signIn();
  }

}
