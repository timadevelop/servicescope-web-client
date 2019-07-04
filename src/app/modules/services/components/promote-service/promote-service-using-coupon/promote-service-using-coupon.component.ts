import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CouponsService } from 'src/app/modules/services/angular-services/coupons.service';
import { NzMessageService } from 'ng-zorro-antd';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-promote-service-using-coupon',
  templateUrl: './promote-service-using-coupon.component.html',
  styleUrls: ['./promote-service-using-coupon.component.scss']
})
export class PromoteServiceUsingCouponComponent implements OnInit {
  loading: boolean = false;
  @Input() service_id;
  success: boolean = false;
  code: string;
  promoted_til: string | Date;

  constructor(
    private i18n: I18n,
    public couponsService: CouponsService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit() {
  }

  useCoupon(code) {
    if (!this.service_id) {
      this.nzMessageService.error(this.i18n({ value: "No service id provided", id: "wrongServiceIdText" }));
      return;
    }
    if (!code || code.length < 7) {
      this.nzMessageService.error(this.i18n({ value: "Wrong coupon code", id: "wrongCouponCodeText" }));
      return;
    }
    this.loading = true;
    this.couponsService.redeem(code, "promote_service", this.service_id)
      .subscribe(
        r => {
          this.loading = false;
          this.code = code;
          this.promoted_til = r.promoted_til;
          this.success = true;
        },
        error => {
          if (error.status == 404) {
            this.nzMessageService.error(this.i18n({ value: "Wrong coupon code", id: "wrongCouponCodeText" }));
          } else {
            console.warn(error);
          }
          this.loading = false;
        });
  }

}
