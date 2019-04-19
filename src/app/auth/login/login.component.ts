import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginApiRequest } from 'src/app/models/api-request/login-api-request.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
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
    const lar = new LoginApiRequest(email, password);

    this.authService.login(lar)
      .subscribe(_ => this.userService.reloadCurrentUser());
  }
}
