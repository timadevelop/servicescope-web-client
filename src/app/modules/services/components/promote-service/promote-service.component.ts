import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/core/models/Service.model';
import { ServicesService } from 'src/app/modules/services/angular-services/services.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { paymentIntents } from 'stripe';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from 'src/app/core/services/user.service';
import { ServicePromotionsService } from 'src/app/modules/services/angular-services/service-promotions.service';
import { ServicePromotion } from 'src/app/core/models/ServicePromotion.model';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';



@Component({
  selector: 'app-promote-service',
  templateUrl: './promote-service.component.html',
  styleUrls: ['./promote-service.component.scss']
})
export class PromoteServiceComponent implements OnInit {

  dateStartingPoint: Date = new Date();
  // price: 2.00 = 200 (200 / 100)
  // (22.03 = 2203 (2203 / 100))
  PLANS = {
    basic: {
      price: 274, currency: 'BGN', days: 3, target_date: this.nDaysFromStartingDate(3)
    },
    pro: {
      price: 403, currency: 'BGN', days: 7, target_date: this.nDaysFromStartingDate(7)
    }
  }

  private nDaysFromStartingDate(days: number) {
    // console.log('old: ', this.dateStartingPoint)
    const d = new Date(this.dateStartingPoint);
    // this.dateStartingPoint.valueOf() + 24*60*60*this.getPlan(plan).days
    d.setDate(d.getDate() + days);
    // console.log(d);
    return d;
  }

  private updatePlansDates() {
    this.PLANS.basic.target_date = this.nDaysFromStartingDate(this.PLANS.basic.days);
    this.PLANS.pro.target_date = this.nDaysFromStartingDate(this.PLANS.pro.days);
  }

  loading: boolean = false;
  service: Service;
  previousPromotion: ServicePromotion;

  useCoupon: boolean = false;

  selectedPlan: 'basic' | 'pro' = null;

  paymentIntent: paymentIntents.IPaymentIntent;
  isBoosted: boolean = false;

  promoteServiceForm = this.fb.group({
    // string
    title: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(70)]], // todo
    // string
    price: [0, [Validators.required, Validators.min(0)]],
  });

  validateUserEmail = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private i18n: I18n,
    private _location: Location,
    private nzMsgService: NzMessageService,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private servicePromotionsService: ServicePromotionsService,
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { service: Service }) => {
        if (!data.service) {
          console.warn('Not found service');
          // this.router.navigate(['/404'])
          return;
        }
        this.service = data.service;
        this.dateStartingPoint = new Date(this.service.promoted_til);
        this.updatePlansDates();

        this.seo.generateTags({
          title: 'Promote ' + this.service.title,
          description: this.service.description,
          image: this.service.images.length > 0 ? this.service.images[0].image : null,
          keywords: this.service.tags.map(t => t.name).join(',')
        });

        if (this.service.promotions && this.service.promotions.length > 0) {
          const url = this.service.promotions[0];
          this.servicePromotionsService.getByUrl(url)
            .subscribe(r => {
              this.previousPromotion = r;
              // this.dateStartingPoint = new Date(r.end_datetime);
              this.updatePlansDates();
            });

        }
      });

    this.route.queryParamMap.subscribe(params => {
      const coupon = params.get('coupon');
      if (coupon == 'true') {
        this.useCoupon = true;
      } else {
        this.useCoupon = false;
      }
    })
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
    return this.PLANS[id];
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

    if (this.previousPromotion) {
      this.fetchPromotion(processMsgId, successMsgId);
    } else {
      this.fetchService(processMsgId, successMsgId);
    }
  }

  private fetchPromotion(processMsgId, successMsgId) {
    setTimeout(() => {
      this.servicePromotionsService.getByUrl(this.previousPromotion.url)
        .subscribe(r => {
          // wait til previous promotion stripe payment intents length changes
          if (this.previousPromotion.stripe_payment_intents.length != r.stripe_payment_intents.length) {
            this.endBoosting(processMsgId, successMsgId);
          } else {
            this.fetchPromotion(processMsgId, successMsgId);
          }
        });
    }, 2000)
  }

  private fetchService(processMsgId, successMsgId) {
    setTimeout(() => {
      this.servicesService.getServiceById(this.service.id)
        .subscribe((r: Service) => {
          // wait til service promotions length changes
          if (r.is_promoted) {
            // && r.promotions.length != this.service.promotions.length) {
            this.endBoosting(processMsgId, successMsgId);
          } else {
            this.fetchService(processMsgId, successMsgId);
          }
        })
    }, 2000);
  }

  private endBoosting(processMsgId, successMsgId) {
    this.nzMsgService.remove(processMsgId);
    this.nzMsgService.remove(successMsgId);
    this.isBoosted = true;
  }

  getPaymentMetadata(): object {
    if (this.selectedPlan) {
      return {
        user_id: this.userService.currentUser ? this.userService.currentUser.id : null,
        reason: 'promote_service',
        plan: this.selectedPlan,
        model: 'service',
        model_id: this.service.id,
        days: this.PLANS[this.selectedPlan].days
      }
    }
  }

  onClosedUserEmailForm() {
    this._location.back();
  }

  submitNewUserEmailForm(): void {
    for (const i in this.validateUserEmail.controls) {
      this.validateUserEmail.controls[i].markAsDirty();
      this.validateUserEmail.controls[i].updateValueAndValidity();
    }

    if (this.validateUserEmail.valid) {
      const email = this.validateUserEmail.controls['email'].value;
      this.userService.patchCurrentUser({email: email})
        .subscribe(user => {
          this.userService.processNewUser(user);
        });
    }
  }

}
