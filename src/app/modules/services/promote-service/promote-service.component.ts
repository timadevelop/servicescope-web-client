import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/core/models/Service.model';
import { ServicesService } from 'src/app/core/services/services.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { paymentIntents } from 'stripe';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from 'src/app/core/services/user.service';


// price: 2.00 = 200 (200 / 100)
// (22.03 = 2203 (2203 / 100))
const PLANS = {
  basic: {
    price: 274, currency: 'BGN', days: 3,
  },
  pro: {
    price: 403, currency: 'BGN', days: 7,
  }
}

@Component({
  selector: 'app-promote-service',
  templateUrl: './promote-service.component.html',
  styleUrls: ['./promote-service.component.scss']
})
export class PromoteServiceComponent implements OnInit {
  loading: boolean = false;
  service: Service;
  selectedPlan: 'basic' | 'pro' = null;

  paymentIntent: paymentIntents.IPaymentIntent;
  isBoosted: boolean = false;

  promoteServiceForm = this.fb.group({
    // string
    title: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(70)]], // todo
    // string
    price: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private i18n: I18n,
    private nzMsgService: NzMessageService,
    private route: ActivatedRoute,
    private servicesService: ServicesService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { service: Service }) => {
        if (!data.service) {
          console.warn('Not found service');
          // this.router.navigate(['/404'])
          return;
        }
        this.service = data.service;
      });
  }

  setSelectedPlan(plan: 'basic' | 'pro') {
    if (this.paymentIntent && this.paymentIntent.status == 'succeeded') {
      return;
    }

    if (this.selectedPlan === plan) {
      this.selectedPlan = null;
    } else {
      this.selectedPlan = plan;
    }
  }

  getPlan(id: string) {
    return PLANS[id];
  }

  onSucceededPayment(paymentIntent: paymentIntents.IPaymentIntent) {
    this.paymentIntent = paymentIntent;
    const successMsgId = this.nzMsgService.success(
      this.i18n({
        value: "Successfully paid for service boosting",
        id: "successPaymentForServiceBoostingText"
      }),
      { nzDuration: 0 }).messageId;
    this.waitUpdatedService(successMsgId)
  }

  private waitUpdatedService(successMsgId) {
    const processMsgId = this.nzMsgService.loading(
      this.i18n({ value: "Boosting your service...", id: "boostingServiceLoadingText" }),
      { nzDuration: 0 }).messageId;
    // fetch service.
    this.fetchService(processMsgId, successMsgId);
  }

  private fetchService(processMsgId, successMsgId) {
    setTimeout(() => {
      this.servicesService.getServiceById(this.service.id)
        .subscribe((r: Service) => {
          // if (r.is_promoted) {
          this.nzMsgService.remove(processMsgId);
          this.nzMsgService.remove(successMsgId);
          this.isBoosted = true;
          // } else {
          // this.fetchService(processMsgId, successMsgId);
          // }
        })
    }, 3000);
  }

  getPaymentMetadata(): object {
    if (this.selectedPlan) {
      return {
        user_id: this.userService.currentUser ? this.userService.currentUser.id : null,
        reason: 'promote_service',
        plan: this.selectedPlan,
        model: 'service',
        model_id: this.service.id,
        days: PLANS[this.selectedPlan].days
      }
    }
  }

}
