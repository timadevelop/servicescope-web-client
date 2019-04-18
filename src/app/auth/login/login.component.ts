import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginApiRequest } from 'src/app/models/api-request/login-api-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router) {
  }

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const email = this.validateForm.controls['email'].value;
      const password = this.validateForm.controls['password'].value;
      this.login(email, password);
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(5), Validators.required]],
    });
  }

  private login(email: string, password: string) {
    const lar = new LoginApiRequest();
    lar.email = email;
    lar.password = password;

    this.authService.login(lar).subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin';

        // Redirect the user
        this.router.navigateByUrl(redirect);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
