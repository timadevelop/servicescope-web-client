import { Component, OnInit } from '@angular/core';
import { Seek } from 'src/app/core/models/Seek.model';
import { SeeksService } from 'src/app/modules/seeks/services/seeks.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { paymentIntents } from 'stripe';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from 'src/app/core/services/user.service';
import { SeekPromotionsSeek } from 'src/app/modules/seeks/services/seek-promotions.service';
import { SeekPromotion } from 'src/app/core/models/SeekPromotion.model';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-promote-seek',
  templateUrl: './promote-seek.component.html',
  styleUrls: ['./promote-seek.component.scss']
})
export class PromoteSeekComponent implements OnInit {

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
  seek: Seek;
  previousPromotion: SeekPromotion;

  useCoupon: boolean = false;

  selectedPlan: 'basic' | 'pro' = null;

  paymentIntent: paymentIntents.IPaymentIntent;
  isBoosted: boolean = false;

  promoteSeekForm = this.fb.group({
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
    private nzMsgSeek: NzMessageService,
    private route: ActivatedRoute,
    private seeksService: SeeksService,
    private seekPromotionsSeek: SeekPromotionsSeek,
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { seek: Seek }) => {
        if (!data.seek) {
          console.warn('Not found seek');
          // this.router.navigate(['/404'])
          return;
        }
        this.seek = data.seek;
        this.dateStartingPoint = new Date(this.seek.promoted_til);
        this.updatePlansDates();

        this.seo.generateTags({
          title: 'Promote ' + this.seek.title,
          description: this.seek.description,
          image: this.seek.images.length > 0 ? this.seek.images[0].image : null,
          keywords: this.seek.tags.map(t => t.name).join(',')
        });

        if (this.seek.promotions && this.seek.promotions.length > 0) {
          const url = this.seek.promotions[0];
          this.seekPromotionsSeek.getByUrl(url)
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
    const successMsgId = this.nzMsgSeek.success(
      this.i18n({
        value: "Successfully paid for seek boosting",
        id: "successPaymentForSeekBoostingText"
      }),
      { nzDuration: 0 }).messageId;
    this.waitUpdatedSeek(successMsgId)
  }

  private waitUpdatedSeek(successMsgId) {
    const processMsgId = this.nzMsgSeek.loading(
      this.i18n({ value: "Boosting your seek...", id: "boostingSeekLoadingText" }),
      { nzDuration: 0 }).messageId;

    if (this.previousPromotion) {
      this.fetchPromotion(processMsgId, successMsgId);
    } else {
      this.fetchSeek(processMsgId, successMsgId);
    }
  }

  private fetchPromotion(processMsgId, successMsgId) {
    setTimeout(() => {
      this.seekPromotionsSeek.getByUrl(this.previousPromotion.url)
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

  private fetchSeek(processMsgId, successMsgId) {
    setTimeout(() => {
      this.seeksService.getSeekById(this.seek.id)
        .subscribe((r: Seek) => {
          // wait til seek promotions length changes
          if (r.is_promoted) {
            // && r.promotions.length != this.seek.promotions.length) {
            this.endBoosting(processMsgId, successMsgId);
          } else {
            this.fetchSeek(processMsgId, successMsgId);
          }
        })
    }, 2000);
  }

  private endBoosting(processMsgId, successMsgId) {
    this.nzMsgSeek.remove(processMsgId);
    this.nzMsgSeek.remove(successMsgId);
    this.isBoosted = true;
  }

  getPaymentMetadata(): object {
    if (this.selectedPlan) {
      return {
        user_id: this.userService.currentUser ? this.userService.currentUser.id : null,
        reason: 'promote_seek',
        plan: this.selectedPlan,
        model: 'seek',
        model_id: this.seek.id,
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
