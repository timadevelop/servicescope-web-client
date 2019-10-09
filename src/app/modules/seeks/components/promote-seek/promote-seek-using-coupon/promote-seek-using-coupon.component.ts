import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CouponsService } from 'src/app/modules/seeks/services/coupons.service';
import { NzMessageService } from 'ng-zorro-antd';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-promote-seek-using-coupon',
  templateUrl: './promote-seek-using-coupon.component.html',
  styleUrls: ['./promote-seek-using-coupon.component.scss']
})
export class PromoteSeekUsingCouponComponent implements OnInit {
  loading: boolean = false;
  @Input() seek_id;
  success: boolean = false;
  code: string;
  promoted_til: string | Date;

  constructor(
    private i18n: I18n,
    public couponsSeek: CouponsService,
    private nzMessageSeek: NzMessageService
  ) { }

  ngOnInit() {
  }

  useCoupon(code) {
    if (!this.seek_id) {
      this.nzMessageSeek.error(this.i18n({ value: "No seek id provided", id: "wrongSeekIdText" }));
      return;
    }
    if (!code || code.length < 7) {
      this.nzMessageSeek.error(this.i18n({ value: "Wrong coupon code", id: "wrongCouponCodeText" }));
      return;
    }
    this.loading = true;
    this.couponsSeek.redeem(code, "promote_seek", this.seek_id)
      .subscribe(
        r => {
          this.loading = false;
          this.code = code;
          this.promoted_til = r.promoted_til;
          this.success = true;
        },
        error => {
          if (error.status == 404) {
            this.nzMessageSeek.error(this.i18n({ value: "Wrong coupon code", id: "wrongCouponCodeText" }));
          } else {
            console.warn(error);
          }
          this.loading = false;
        });
  }

}
