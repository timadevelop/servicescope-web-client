import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { RegisterApiRequest } from 'src/app/core/models/api-request/register-api-request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LoginApiRequest } from 'src/app/core/models/api-request/login-api-request.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
      const password1 = this.validateForm.controls['password'].value;
      const password2 = this.validateForm.controls['checkPassword'].value;
      const first_name = this.validateForm.controls['first_name'].value;
      const last_name = this.validateForm.controls['last_name'].value;

      this.register(email, password1, password2, first_name, last_name);
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(8), Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      first_name: [null, [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
      last_name: [null, [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
    });
  }

  private register(
    email: string,
    password1: string,
    password2: string,
    first_name: string,
    last_name: string) {

    const rar = new RegisterApiRequest(email, password1, password2, first_name, last_name);

    this.authService.register(rar)
      .subscribe(
        registered => {
          if (registered) {
            this.login(email, password1);
          }
        },
        error => {
          this.handleRegistrationError(error);
        });
  }

  private login(email: string, password: string) {
    const lar = new LoginApiRequest(email, password);

    this.authService.login(lar)
      .subscribe(_ => this.userService.reloadCurrentUser());
  }

  private handleRegistrationError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      for (let key in error.error) {
        const control = this.validateForm.controls[key];
        if (control) {
          control.setErrors({ 'customerror': error.error[key] });
        } else {
          console.warn(`field ${key} is not represented in front-end`);
        }
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
