import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginApiRequest } from 'src/app/core/models/api-request/login-api-request.model';
import { UserService } from 'src/app/core/services/user.service';

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

  loading: boolean = false;
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
      other: { value: null, disabled: true }
    });
  }

  private login(email: string, password: string) {
    this.loading = true;
    const lar = new LoginApiRequest(email, password);

    this.authService.login(lar)
      .subscribe(
        _ => {
          // this.userService.reloadCurrentUser()
          this.router.navigate(['/']);
          this.loading = false;
        },
        error => {
          for (let key in error.error) {
            if (key === 'error' && error.error[key] === 'invalid_grant') {
              const error_description = error.error["error_description"];
              this.validateForm.controls['other'].setErrors({ 'invalid_grant': error_description })
              break;
            }
          }
          this.loading = false;
        });
  }
}
