import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent {

  constructor(
    private fb: FormBuilder,
    private nzMsg: NzMessageService,
    public authService: AuthService,
    private router: Router) {
  }

  loading: boolean = false;

  validateForm: FormGroup = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
  });

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const email = this.validateForm.controls['email'].value;
      this.restore(email);
    }
  }

  private async restore(email: string) {
    this.loading = true;

    try {
      const result = await this.authService.restore(email).toPromise();
      this.nzMsg.success(result.detail);
      this.router.navigate(['/']);
      this.loading = false;
    } catch (e) {
      let errorMsg = "Error restoring password";
      if ('error' in e) {
        if ('email' in e.error) {
          if ('email' in e.error.email) {
            errorMsg = e.error.email.email[0];
          } else {
            errorMsg = e.error.email[0];
          }
        }
      }
      this.nzMsg.error(errorMsg);
      this.loading = false;
    }
  }
}
